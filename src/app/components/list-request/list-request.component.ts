import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  private requestsSubscription: Subscription | undefined;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestsSubscription = this.requestService.getRequests$().subscribe((requests) => {
      this.requests = requests;
    });
  }

  ngOnDestroy(): void {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }
}
