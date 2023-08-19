import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  // userEmail: string = '';
  // customers: Customer[] = [];
  customerDetail:Customer = {};


constructor(private customerService: CustomerService) { }

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
}