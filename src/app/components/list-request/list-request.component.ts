import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss'],
})
export class ListRequestComponent implements OnInit, OnDestroy {
  requests: Request[] | undefined = [];
  private requestsSubscription: Subscription | undefined;

  constructor(private usersService: UsersService) {
    this.usersService.selectedCustomer$.subscribe((customer) => {
      if (customer) {
        this.requests = customer?.requests;
      }
    });
  }

  ngOnInit(): void {
    const selectedCustomer = JSON.parse(
      sessionStorage.getItem('selectedCustomer') ?? ''
    );
    if (selectedCustomer) {
      this.requests = selectedCustomer.requests;
    }
  }

  ngOnDestroy(): void {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }
}
