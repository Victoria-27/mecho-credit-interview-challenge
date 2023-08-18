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
    const storedRequests = sessionStorage.getItem('requests');
    if (storedRequests) {
      this.requests = JSON.parse(storedRequests);
    }

    // Notify subscribers about the initial requests
    this.requestsSubject.next(this.requests);
  }

  getRequests$(): Observable<Request[]> {
    return this.requestsSubject.asObservable();
  }

  createRequest(request: Request): boolean {
    try {
      const { userEmail, amount, method } = request;
      this.customerService.updateBalance(userEmail, amount, method);

      // Add request to the list
      this.requests.push(request);

      // Update requests data in session storage
      this.updateRequestInSessionStorage();

      // Notify subscribers about the updated requests
      this.requestsSubject.next(this.requests);

      return true;
    } catch (error) {
      // Handle error gracefully
      console.error('error creating request', error);
      return false;
    }
  }

  private updateRequestInSessionStorage() {
    sessionStorage.setItem('requests', JSON.stringify(this.requests));
  }
}
