import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Request } from 'src/app/models/request.model';
import { REQUESTS } from 'src/app/data/requests.data';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
 private requests: Request[] = [];
  private requestsSubject = new BehaviorSubject<Request[]>(this.requests);

  constructor(private customerService: CustomerService) {
    this.requests = REQUESTS;

    // Initialize requests from session storage
    const storedRequests = sessionStorage.getItem('requestsData');
    if (storedRequests) {
      this.requests = JSON.parse(storedRequests);
    }

    // Notify subscribers about the initial requests
    this.requestsSubject.next(this.requests);
  }

  getRequests$(): Observable<Request[]> {
    return this.requestsSubject.asObservable();
  }

 updateRequestSessionStorage() {
  console.log('updateRequestSessionStorage')
    return JSON.parse(sessionStorage.getItem('requestsData') || '[]');
  }
  
}