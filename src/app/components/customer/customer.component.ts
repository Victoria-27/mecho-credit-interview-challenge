import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers$: Observable<Customer[]> = of([]);

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers$();
  }
}
