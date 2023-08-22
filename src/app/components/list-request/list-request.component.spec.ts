import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestComponent } from './list-request.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { SharedService } from 'src/app/services/sharedService/shared.service';

describe('ListRequestComponent', () => {
  let component: ListRequestComponent;
  let fixture: ComponentFixture<ListRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestComponent]
    });
    fixture = TestBed.createComponent(ListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
