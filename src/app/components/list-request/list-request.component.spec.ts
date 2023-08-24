import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListRequestComponent } from './list-request.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { UsersService } from 'src/app/services/users.service';

describe('ListRequestComponent', () => {
  let component: ListRequestComponent;
  let fixture: ComponentFixture<ListRequestComponent>;

  beforeEach(async () => {
  
    await TestBed.configureTestingModule({
      declarations: [ListRequestComponent],
      imports: [HttpClientModule], 
      providers: [UsersService], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
