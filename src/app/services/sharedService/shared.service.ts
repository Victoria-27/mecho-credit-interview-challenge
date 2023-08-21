import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { REQUESTS } from 'src/app/data/requests.data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private buttonTextSubject = new BehaviorSubject<string>(''); 
  buttonText$: Observable<string> = this.buttonTextSubject.asObservable();

  // private selectedCustomerSubject = new BehaviorSubject<string | null>(null);
  // selectedCustomer$: Observable<string | null> = this.selectedCustomerSubject.asObservable();

  // Add initialBalanceSubject
  private initialBalanceSubject = new BehaviorSubject<number | null>(null);
  initialBalance$: Observable<number | null> = this.initialBalanceSubject.asObservable();

  private requestFormSubject = new BehaviorSubject<any | null>(null);
  requestForm$: Observable<any | null> = this.requestFormSubject.asObservable();

  private requestsSubject = new BehaviorSubject<any | null>(REQUESTS);
  requestsSubject$: Observable<any | null> = this.requestsSubject.asObservable();

  setRequests(requests: Request[]) {
    this.requestsSubject.next(requests);
  }

  setRequestForm(requestForm: any) {
    console.log('requestForm', requestForm);
    this.requestFormSubject.next(requestForm);
  }


  setButtonText(text: string) {
    this.buttonTextSubject.next(text);
  }

  // setSelectedCustomer(selectedCustomer: string | null) {
  //   this.selectedCustomerSubject.next(selectedCustomer);
  // }

  // Add setInitialBalance method
  setInitialBalance(balance: number | null) {
    this.initialBalanceSubject.next(balance);
  }
  private selectedCustomerSubject = new BehaviorSubject<any>(null);
  selectedCustomer$: Observable<void> = this.selectedCustomerSubject.asObservable();

  setSelectedCustomer() {
    this.selectedCustomerSubject.next(null);
  }
}
