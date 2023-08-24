import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:3000/customers';

  private selectedCustomer = new BehaviorSubject<Customer>({});
  selectedCustomer$: Observable<Customer> =
    this.selectedCustomer.asObservable();

  getCustomers(): Observable<Customer[]> {
    return this.http.get(this.BASE_URL) as Observable<Customer[]>;
  }

  updateCustomerRequest(id: number, customer: Customer): Observable<Customer> {
    return this.http.put(
      `${this.BASE_URL}/${id}`,
      customer
    ) as Observable<Customer>;
  } 
  private resetFormSubject = new BehaviorSubject<boolean>(false);
  resetFormSubject$: Observable<boolean> = this.resetFormSubject.asObservable();

  notifyResetForm() {
    this.resetFormSubject.next(true);
  }

  setSelectedCustomer(customer: Customer) {
    this.selectedCustomer.next(customer);
  }
}
