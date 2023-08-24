import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, Observable } from 'rxjs'; // Import Observable from rxjs
import { RequestComponent } from './request.component';
import { UsersService } from 'src/app/services/users.service';


class MockUsersService {
  updateCustomerRequest(id: number, customer: any): Observable<null> {
    return of(null);
  }

  // Other mock methods if needed
}

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [RequestComponent],
      providers: [{ provide: UsersService, useClass: MockUsersService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form on resetFormSubject$ subscription', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.requestForm.get('method')?.value).toBe(null);
    expect(component.requestForm.get('type')?.value).toBe(null);
    expect(component.requestForm.get('amount')?.value).toBe(null);
  }));

  it('should update customer request and reset form on successful submission', fakeAsync(() => {
    const selectedCustomer = {
      id: 1,
      userEmail: 'test@example.com',
      balance: 10000,
      requests: [],
    };
    spyOn(window.sessionStorage, 'getItem').and.returnValue(JSON.stringify(selectedCustomer));
    component.ngOnInit();
    component.requestForm.setValue({
      method: 'cash',
      type: 'inspection',
      amount: 2500,
    });

    component.createRequest();
    tick();

    expect(usersService.updateCustomerRequest).toHaveBeenCalledWith(1, selectedCustomer);
    expect(component.requestForm.get('method')?.value).toBe(null);
    expect(component.requestForm.get('type')?.value).toBe(null);
    expect(component.requestForm.get('amount')?.value).toBe(null);
  }));

it('should handle insufficient balance correctly', fakeAsync(() => {
  const selectedCustomer = {
    id: 1,
    userEmail: 'test@example.com',
    balance: 1000,
    requests: [],
  };
  spyOn(window.sessionStorage, 'getItem').and.returnValue(JSON.stringify(selectedCustomer));
  spyOnProperty(component.requestForm, 'valid', 'get').and.returnValue(true);
  component.ngOnInit();
  component.requestForm.setValue({
    method: 'credit',
    type: 'inspection',
    amount: 2500,
  });

  // Use 'as any' to bypass type checking
  spyOn(usersService, 'updateCustomerRequest').and.returnValue(of(null as any));

  component.createRequest();
  tick();

  expect(component.insufficientBalance).toBe(true);
  expect(usersService.updateCustomerRequest).not.toHaveBeenCalled();
}));

// ...



  it('should not submit request if form is invalid', () => {
    spyOnProperty(component.requestForm, 'valid', 'get').and.returnValue(false);
    spyOn(usersService, 'updateCustomerRequest');
    
    component.createRequest();

    expect(usersService.updateCustomerRequest).not.toHaveBeenCalled();
  });

  // Add more tests as needed to cover other scenarios and components.
});
