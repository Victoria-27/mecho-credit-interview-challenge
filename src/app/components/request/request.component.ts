import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Request } from 'src/app/models/request.model';
import { Customer } from 'src/app/models/customer.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  customers: Customer[] = [];
  request: Request[] = [];
  globalSubscriptions: Subscription[] = [];
  methodSelected = false;
  typeSelected = false;
  selectedCustomer: string | null = null;
  initialBalance: number | '' = '';
  insufficientBalance = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.methodSelected = false;
    this.typeSelected = false;

    this.requestForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      method: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });

    this.requestForm.controls['method'].valueChanges.subscribe({
      next: (method: string) => {
        this.methodSelected = !!method;
        this.getServiceCost(method);
      },
    });

    this.requestForm.controls['type'].valueChanges.subscribe({
      next: (type: string) => {
        this.typeSelected = !!type;
        this.getServiceCost(type);
      },
    });

    this.globalSubscriptions.push(
      this.requestForm.controls['type'].valueChanges.subscribe({
        next: (type: string) => {
          this.getServiceCost(type);
        },
      })
    );
  }

  errorCreatingRequest = false;

  createRequest() {
    const selectedCustomer = JSON.parse(
      sessionStorage.getItem('selectedCustomer') || ''
    );

    if (selectedCustomer && this.requestForm.valid) {
      const newRequest: Request = this.requestForm.value;
      newRequest.userEmail = selectedCustomer.userEmail;
      newRequest.createdAt = String(new Date());

      if (newRequest.method === 'credit') {
        if (newRequest.amount > selectedCustomer.balance) {
          this.insufficientBalance = true;
          return;
        }
        selectedCustomer.balance -= newRequest.amount;
      }
      selectedCustomer.requests.unshift(newRequest);
      this.insufficientBalance = false;
      this.usersService.updateCustomerRequest(selectedCustomer.id, selectedCustomer); 
   
          sessionStorage.setItem(
            'selectedCustomer',
            JSON.stringify(selectedCustomer)
          );
          this.usersService.setSelectedCustomer(selectedCustomer);
          this.requestForm.reset();

    }
  }

  private getServiceCost(type: string) {
    const controls = this.requestForm.controls;
    const selectedType = type;
    switch (selectedType) {
      case 'inspection':
        controls['amount'].setValue(2500);
        break;
      case 'servicing':
        controls['amount'].setValue(4000);
        break;
      case 'repairs':
        controls['amount'].setValue(10000);
        break;
      case 'maintenance':
        controls['amount'].setValue(6000);
        break;
      default:
        controls['amount'].setValue(0);
        break;
    }
  }

  get methodControl(): AbstractControl | null {
    return this.requestForm.get('method');
  }

  get typeControl(): AbstractControl | null {
    return this.requestForm.get('type');
  }

  ngOnDestroy(): void {}
}
