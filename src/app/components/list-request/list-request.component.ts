import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { SharedService } from 'src/app/services/sharedService/shared.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  private requestsSubscription: Subscription | undefined;
  requestDataFromSessionStorage: any;
  private selectedCustomerSubscription: Subscription;

  constructor(private requestService: RequestService, private sharedService: SharedService) {
    this.selectedCustomerSubscription = this.sharedService.selectedCustomer$.subscribe(
      () => {
        this.getUpdatedRequests();
      }
    );
  }

  ngOnInit(): void {

    // this.requestsSubscription = this.requestService.getRequests$().subscribe((requests) => {
    //   this.requests = requests;
    // });

    // this.requestService.updateRequestSessionStorage();

    // 
    this.requests = this.requestService.updateRequestSessionStorage();
  }
  async getUpdatedRequests() {
    this.requests = await this.requestService.updateRequestSessionStorage();
    return this.requests;
  }

  
  ngOnDestroy(): void {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }
}
