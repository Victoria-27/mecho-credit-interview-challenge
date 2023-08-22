import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { REQUESTS } from 'src/app/data/requests.data';

describe('SharedDataService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
