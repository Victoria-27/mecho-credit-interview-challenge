import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Subscription, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

// Create a mock for the UsersService
class UsersServiceMock {
  selectedCustomer$ = of({} as Customer);
}

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [],
      providers: [{ provide: UsersService, useClass: UsersServiceMock }],
    });
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
