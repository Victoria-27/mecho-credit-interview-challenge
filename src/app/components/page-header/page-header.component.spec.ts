import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ userEmail: 'test@example.com', /* ... other properties */ })
    ); // Mock getItem to provide valid JSON data

    fixture = TestBed.createComponent(PageHeaderComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... other test cases
});






