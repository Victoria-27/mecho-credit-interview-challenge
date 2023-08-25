import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CUSTOMER } from 'src/app/data/customer.data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersSubject: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  customers$: Observable<Customer[]> = this.customersSubject.asObservable();
    
  constructor() { 
    this.customers = CUSTOMER;

    // Initialize customers from session storage 
    const storedCustomers = sessionStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
      this.customersSubject.next(this.customers);
    }
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomers$(): Observable<Customer[]> {
    return this.customers$;
  }

  updateBalance(userEmail: string, amount: number, method: string): boolean {
    const customer:any = this.customers.find(cust => cust.userEmail === userEmail);
    if (!customer) {
      throw new Error('Customer not found');
    }

    if (method === 'credit' && customer.balance - amount < 0) {
      throw new Error('Insufficient balance');
    }

    if (method === 'credit') {
      customer.balance -= amount;
      this.updateCustomerInSessionStorage();
      this.customersSubject.next(this.customers);
    }

    return true;
  }

  private updateCustomerInSessionStorage(): void {
    sessionStorage.setItem('customers', JSON.stringify(this.customers));
  }
}