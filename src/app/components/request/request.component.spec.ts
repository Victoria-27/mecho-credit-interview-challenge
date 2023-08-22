import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/sharedService/shared.service';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RequestComponent]
    });
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
