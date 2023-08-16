import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';
import { CUSTOMERS } from 'src/app/data/customer.data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
    
  constructor(private http: HttpClient) { 
    this.customers = CUSTOMERS;
    // Initialize customers from session storage 
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  updateBalance(userEmail: string, amount: number, method: string): boolean {
    const customer = this.customers.find(cust => cust.userEmail === userEmail);
    if (!customer) {
      throw new Error('Customer not found');
    }

    if (method === 'credit' && customer.balance - amount < 0) {
      throw new Error('Insufficient balance');
    }

    if (method === 'credit') {
      customer.balance -= amount;
    }
// Update customer data in session storage

return true;

  }

}
