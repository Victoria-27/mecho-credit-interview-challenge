import { Injectable } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { Request } from 'src/app/models/request.model';
import { REQUESTS } from 'src/app/data/requests.data';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests: Request[] = [];

  constructor(private customerService:CustomerService) { 
    this.requests = REQUESTS;

    // Initialize requests from session storage
    
  }


    getRequests(): Request[] {
      return this.requests;
  }

  createRequest(request: Request): boolean {
    try {
      const {userEmail, amount, method } = request;
      this.customerService.updateBalance(userEmail, amount, method);

      // Add request to the list
      this.requests.push(request);

         // Update requests data in session storage
          sessionStorage.setItem('requests', JSON.stringify(this.requests));
          return true;

    } catch (error) {
       // Handle error gracefully
        console.error('error creating request',error);
        return false;
    }
  }
}


