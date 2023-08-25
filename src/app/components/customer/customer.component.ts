import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, OnDestroy {
  customerDetail: Customer = {};
  chargedAmount: number = 0;
  subscription: Subscription;

  constructor(private usersService: UsersService) {
    this.subscription = this.usersService.selectedCustomer$.subscribe(
      (customer) => {
        this.customerDetail = customer;
      }
    );
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    const selectedCustomer = JSON.parse(
      sessionStorage.getItem('selectedCustomer') ?? ''
    );
    if (selectedCustomer) {
      this.customerDetail = selectedCustomer;
    }
  }
    resetApp(){
    sessionStorage.clear();
    window.location.reload();
    }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


