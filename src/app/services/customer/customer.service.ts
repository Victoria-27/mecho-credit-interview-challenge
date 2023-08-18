import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CUSTOMERS } from 'src/app/data/customer.data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
    
  constructor() { 
    this.customers = CUSTOMERS;
    // Initialize customers from session storage 
    const storedCustomers = sessionStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
    }
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
    this.updateCustomerInSessionStorage();

return true;

  }
  private updateCustomerInSessionStorage(): void {
    sessionStorage.setItem('customers', JSON.stringify(this.customers));
  }

}
