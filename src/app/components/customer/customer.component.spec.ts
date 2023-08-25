import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { Customer } from '../../models/customer.model';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class UsersServiceMock {
  selectedCustomer$ = of({
    userEmail: 'melissa.brown@example.com',
    balance: 85000,
  } as Customer);
}

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    });

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;

    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ userEmail: 'melissa.brown@example.com', balance: 85000})
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display selected customer details', () => {
    component.getUserDetails();
    expect(component.customerDetail.userEmail).toEqual('melissa.brown@example.com');
  });

  it('should unsubscribe from subscription on ngOnDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should display customer details', () => {
  const emailElement = fixture.nativeElement.querySelector('.text-blue-500');
  const balanceElement = fixture.nativeElement.querySelector('.text-blue-500 + p');

  expect(emailElement.textContent).toContain('Email: melissa.brown@example.com');
  expect(balanceElement.textContent).toContain('Balance:');
  expect(balanceElement.textContent).toContain('85,000.00'); 
});


  afterEach(() => {
    fixture.destroy();
  });
});
