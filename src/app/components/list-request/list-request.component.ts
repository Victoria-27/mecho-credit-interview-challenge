import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { SharedService } from 'src/app/services/sharedService/shared.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss'],
})
export class ListRequestComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  private requestsSubscription: Subscription | undefined;
  requestDataFromSessionStorage: any;
  private selectedCustomerSubscription: Subscription;

  constructor(
    private requestService: RequestService,
    private sharedService: SharedService
  ) {
    this.selectedCustomerSubscription =
      this.sharedService.selectedCustomer$.subscribe(() => {
        this.sharedService.requestsSubject$.subscribe((requests: []) => {
          let selectedCustomer = sessionStorage.getItem('selectedCustomer');
          selectedCustomer =
            selectedCustomer !== null ? JSON.parse(selectedCustomer) : '';
          console.log('selectedCustomer', selectedCustomer);
          let filteredRequest = requests.filter((request: any) => {
            return request.userEmail === selectedCustomer;
          });
          console.log('filteredRequest', filteredRequest);
          this.requests = filteredRequest;
          // sessionStorage.setItem('requestsData', JSON.stringify(filteredRequest));
        });
      });
  }

  ngOnInit(): void {
    // this.requests = this.requestService.updateRequestSessionStorage();

    let selectedCustomer = sessionStorage.getItem('selectedCustomer');
    selectedCustomer =
      selectedCustomer !== null ? JSON.parse(selectedCustomer) : '';
    console.log('selectedCustomer', selectedCustomer);

    let tempRequests: string | null = sessionStorage.getItem('requestsData');
    let requests: [] =[];
    if (tempRequests !== null) {
      requests = JSON.parse(tempRequests)
    }
    let filteredRequest = requests.filter((request: any) => {
      return request.userEmail === selectedCustomer;
    });
    console.log('filteredRequest', filteredRequest);
    this.requests = filteredRequest;
  }

  ngOnDestroy(): void {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }
}
