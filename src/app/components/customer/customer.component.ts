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

  customerDetail:Customer = {};
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
  getUserDetails(){
    let customers = (sessionStorage.getItem('customerData'));
    let selectedCustomer: any = sessionStorage.getItem('selectedCustomer');
    console.log('selectedCustomer',selectedCustomer)
    if (customers !== null && selectedCustomer !== null) {
      this.customerDetail = JSON.parse(customers).filter((customer: any) => {
        return customer.userEmail === JSON.parse(selectedCustomer);
        })[0];
    }
    console.log('customerDetail',this.customerDetail)
  }

  ngOnDestroy(): void {
    this.selectedCustomerSubscription.unsubscribe();
  }
}