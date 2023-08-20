import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/sharedService/shared.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private customerService: CustomerService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();

    this.requestService.getRequests$().subscribe((requests) => {
      this.request = requests;
    });

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

    // this.sharedService.selectedCustomer$.subscribe((selectedCustomer) => {
      // this.selectedCustomer = selectedCustomer;
      
      // Retrieve the initial balance based on the selected customer's email
    //   const selectedCustomerData = sessionStorage.getItem('selectedCustomerData');
    //   if (selectedCustomerData) {
    //     const customerData = JSON.parse(selectedCustomerData);
    //     if (customerData.userEmail === selectedCustomer) {
    //       this.initialBalance = customerData.balance;
    //     }
    //   }
    // });
  }

  errorCreatingRequest = false;

  createRequest() {
    let customerDetails = sessionStorage.getItem('selectedCustomerDetails');
    if (customerDetails) {
      const customerData = JSON.parse(customerDetails);
      this.initialBalance = customerData.balance;
      this.selectedCustomer = customerData.userEmail;
    }

    if (this.requestForm.valid) {
      const request: Request = this.requestForm.value;
      // console.log('REQUEST', request)
      // this.sharedService.setRequestForm(request);
      // const userEmail = request.userEmail;
      // const amount = request.amount;
      // let customerData = sessionStorage.getItem('selectedCustomerData');
      // Retrieve the selected customer's data from session storage
      if(Number(this.initialBalance) < Number(request.amount)) {
        console.error('Insufficient balance');
        return;
      }

      const allCustomerData = sessionStorage.getItem('customerData');
      if (allCustomerData) {
        const allCustomers = [...JSON.parse(allCustomerData)];
        const selectedCustomerData = allCustomers.find((customer: any) => customer.userEmail === this.selectedCustomer);
        console.log('SELECTED CUSTOMER DATA', selectedCustomerData)
        selectedCustomerData.balance = Number(this.initialBalance) - Number(request.amount);
        sessionStorage.setItem('selectedCustomerDetails', JSON.stringify(selectedCustomerData));
        allCustomers.forEach((customer: any) => {
          if (customer.userEmail === this.selectedCustomer) {
            customer.balance = selectedCustomerData.balance;
          }
        });
        sessionStorage.setItem('customerData', JSON.stringify(allCustomers))
        this.sharedService.setSelectedCustomer();
        let requestData = sessionStorage.getItem('requestsData');
        if (requestData) {
          const allRequests = [...JSON.parse(requestData)];
          allRequests.unshift({
            userEmail: this.selectedCustomer,
            amount: request.amount,
            method: request.method,
            type: request.type,
            createdAt: new Date(),
          });
          sessionStorage.setItem('requestsData', JSON.stringify(allRequests));
          this.requestService.updateRequestSessionStorage();
        }

      }
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

  ngOnDestroy(): void {
    this.globalSubscriptions.forEach((x) => x.unsubscribe());
  }
}
