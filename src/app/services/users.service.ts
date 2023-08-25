import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CUSTOMER } from '../data/customer.data';
import { REQUESTS } from '../data/requests.data';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private selectedCustomer = new BehaviorSubject<Customer>({});
  selectedCustomer$: Observable<Customer> =
    this.selectedCustomer.asObservable();

  
  setSelectedCustomer(customer: Customer) {
    this.selectedCustomer.next(customer);
  }

  getCustomers(){
    const customers = CUSTOMER;
    const requests = REQUESTS;
   const updatedCustomers = customers.map((customer) => {
      const customerRequests = requests.filter((request) => request.userEmail === customer.userEmail);
      return {
        ...customer,
        requests: customerRequests
      }
    }
    )
    sessionStorage.setItem('customers', JSON.stringify(updatedCustomers));
  }

  updateCustomerRequest(userEmail: string, customer: Customer){
    const customers = JSON.parse(sessionStorage.getItem('customers') ?? '');
    console.log(customers);
    const filteredCustomers = customers.filter((customer: Customer) => customer.userEmail !== userEmail);
    console.log(filteredCustomers);
    const updatedCustomers = [...filteredCustomers, customer];

    sessionStorage.setItem('customers', JSON.stringify(updatedCustomers));
    
  }

  private resetFormSubject = new BehaviorSubject<boolean>(false);
  resetFormSubject$: Observable<boolean> = this.resetFormSubject.asObservable();

  notifyResetForm() {
    this.resetFormSubject.next(true);
  }
}
