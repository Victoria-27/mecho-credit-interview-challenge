import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CUSTOMER } from 'src/app/data/customer.data';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
