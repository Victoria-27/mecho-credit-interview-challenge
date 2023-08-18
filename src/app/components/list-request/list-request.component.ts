import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit{
  requests: Request[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requests = this.requestService.getRequests();
  }

}
