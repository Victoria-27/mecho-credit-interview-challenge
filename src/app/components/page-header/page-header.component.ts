import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  customerEmailOptions$: Observable<{ label: string; value: string }[]> = of(
    []
  );
  selectedCustomerEmail = '';
  customers!: Customer[] | null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getCustomers();
    this.customers = JSON.parse(sessionStorage.getItem('customers') ?? '');

  }

  setSelectedCustomer() {
    this.customers = JSON.parse(sessionStorage.getItem('customers') ?? '');

    
    const customer = this.customers?.find(
      (customer) => customer.userEmail === this.selectedCustomerEmail
    );
    if (customer) {
      sessionStorage.setItem('selectedCustomer', JSON.stringify(customer));
      this.usersService.setSelectedCustomer(customer);
    }
    this.usersService.notifyResetForm();
  }

}
