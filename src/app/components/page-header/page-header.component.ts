import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/sharedService/shared.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  customerEmailOptions$: Observable<{ label: string; value: string }[]> = of(
    []
  );
  selectedCustomer = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    const customerData = sessionStorage.getItem('customerData');
    const selectedCustomer = sessionStorage.getItem('selectedCustomer');

    if (customerData !== null) {
      this.customerEmailOptions$ = of(JSON.parse(customerData)).pipe(
        map((customers: any) =>
          customers.map((customer: any) => ({
            label: customer.userEmail,
            value: customer.userEmail,
          }))
        )
      );
    }

    if (selectedCustomer !== null) {
      this.selectedCustomer = JSON.parse(selectedCustomer);
    }
  }

  setSelectedCustomer() {
    sessionStorage.setItem(
      'selectedCustomer',
      JSON.stringify(this.selectedCustomer)
    );
    this.sharedService.setSelectedCustomer();
  }
}