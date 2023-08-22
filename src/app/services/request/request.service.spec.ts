import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Request } from 'src/app/models/request.model';
import { REQUESTS } from 'src/app/data/requests.data';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
