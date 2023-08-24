import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Subscription, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ userEmail: 'test@example.com', /* ... other properties */ })
    ); // Mock getItem to provide valid JSON data

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... other test cases
});
