import { Component,OnInit } from '@angular/core';
import { CUSTOMER } from './data/customer.data';
import { REQUESTS } from './data/requests.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mecho-credit-interview-challenge';

  ngOnInit(){
    console.log('customer',CUSTOMER)
    console.log('requests',REQUESTS)
    let customerData = (sessionStorage.getItem('customerData'));
    let requestsData = (sessionStorage.getItem('requestsData'));
    if (customerData === null) {
      sessionStorage.setItem('customerData', JSON.stringify(CUSTOMER));
    }
    if (requestsData === null) {
      sessionStorage.setItem('requestsData', JSON.stringify(REQUESTS));
    }
  }
}
