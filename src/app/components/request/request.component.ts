import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Subscription } from 'rxjs';
export interface RequestForm {
  Amount: number;
  Method: string;
  Type: string;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})

export class RequestComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup<any>;
  customers: Customer[] = [];
  request: Request[] = [];
  globalSubscriptions: Subscription[] = []


  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
    this.request = this.requestService.getRequests();

    this.requestForm = this.formBuilder.group({
      amount:[null, [Validators.required, Validators.min(0)]],
      method: ['credit', Validators.required],
      type:['repairs', Validators.required]
    });

    this.globalSubscriptions.push(this.requestForm.controls['type'].valueChanges.subscribe({
      next: (type: string) => {
        console.log(type)
        this.getServiceCost(type)
      }
    }))
  }

  createRequest() {
    if (this.requestForm.valid) {
      const request: Request = this.requestForm.value;
      if (this.requestService.createRequest(request)) {
        this.customers = this.customerService.getCustomers();
        this.request = this.requestService.getRequests();
      } else {
        // Handle error
        alert(
          'Error creating request. Please check your balance and try again'
        );
      }
    } else {
      // Handle from validation errors
      alert('Please fill all the required fields and fix validation errors');
    }
  }

 private getServiceCost(type: string) {
  console.log('type',type)
   const controls = this.requestForm.controls;
    const selectedType = type
    switch (selectedType) {
      case 'inspection':
      controls['amount'].setValue(2500);
      return
      case 'servicing':
        controls['amount'].setValue(4000);
        return
      case 'repairs':
        controls['amount'].setValue(10000);
        return
      case 'maintenance':
        controls['amount'].setValue(6000);
        return
      default:
        return 0;
    }
  }

  ngOnDestroy(): void {
    this.globalSubscriptions.forEach(x => x.unsubscribe());
  }
}
