import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  customerEmailOptions$: Observable<{ label: string, value: string }[]> = of([]);
  displayDetails = false;
  selectedCustomer = '';

  constructor() { }

  ngOnInit(): void {
    const customerData = sessionStorage.getItem('customerData');
    const selectedCustomer = sessionStorage.getItem('selectedCustomer');
    
    if (customerData !== null) {
      this.customerEmailOptions$ = of(JSON.parse(customerData)).pipe(
        map((customers: any) => 
          customers.map((customer: any) => ({
            label: customer.userEmail,
            value: customer.userEmail
          }))
        )
      );
    }

    if (selectedCustomer !== null) {
      this.selectedCustomer = JSON.parse(selectedCustomer);
    }
  }

  setSelectedCustomer() {
    sessionStorage.setItem('selectedCustomer', JSON.stringify(this.selectedCustomer));
  }
}
