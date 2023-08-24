import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component,OnInit } from '@angular/core';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RequestComponent } from './components/request/request.component';
import { ListRequestComponent } from './components/list-request/list-request.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent
      ,PageHeaderComponent
      ,CustomerComponent
      ,RequestComponent
      ,ListRequestComponent
    ],
    imports: [ReactiveFormsModule,FormsModule,HttpClientModule],
    providers: []
  }).compileComponents()
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mecho-credit-interview-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mecho-credit-interview-challenge');
  });

});
