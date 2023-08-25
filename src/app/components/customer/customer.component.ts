import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  customerDetail: Customer = {};
  chargedAmount: number = 0;
  private selectedCustomerSubscription: Subscription;


constructor(private customerService: CustomerService, private sharedService: SharedService) {
  this.selectedCustomerSubscription = this.sharedService.selectedCustomer$.subscribe(
    () => {
      this.getUserDetails();
    }
  );
 }

ngOnInit(): void {
  this.getUserDetails();
  }
  getUserDetails() {
    let customers = sessionStorage.getItem('customerData');
  
    let selectedCustomer: any = sessionStorage.getItem('selectedCustomer');
    if (customers !== null && selectedCustomer !== null) {
      const selectedEmail = JSON.parse(selectedCustomer);
      
      const customerData = JSON.parse(customers);
      const selectedCustomerData = customerData.find((customer: any) => customer.userEmail === selectedEmail);
      
      if (selectedCustomerData) {
        this.customerDetail = {
          userEmail: selectedCustomerData.userEmail,
          balance: selectedCustomerData.balance,
        };
        sessionStorage.setItem('selectedCustomerDetails', JSON.stringify(selectedCustomerData));
      }
    }
  }
  
  resetApp(){
    sessionStorage.clear();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.selectedCustomerSubscription.unsubscribe();
  }
}