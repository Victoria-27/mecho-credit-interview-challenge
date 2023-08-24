import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PageHeaderComponent } from './page-header.component';
import { UsersService } from 'src/app/services/users.service';
import { Customer } from 'src/app/models/customer.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [UsersService],
    });

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);

    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ userEmail: 'test@example.com', balance: 85000})
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty selected customer', () => {
    expect(component.selectedCustomer).toBe('');
  });

  it('should initialize with no customers', () => {
    expect(component.customers).toBeUndefined();
  });

  it('should populate customerEmailOptions$ on initialization', () => {
    const customers: Customer[] = [
      { userEmail: 'user1@example.com' }
    
    ];
  
    spyOn(usersService, 'getCustomers').and.returnValue(of(customers));
  
    component.ngOnInit();
  
    component.customerEmailOptions$.subscribe((options) => {
      const customerEmails = customers.map((customer) => customer.userEmail);
  
      const optionLabels = options.map((option) => option.label);
      const optionValues = options.map((option) => option.value);
  
      optionLabels.forEach((label) => {
        expect(customerEmails).toContain(label);
      });
  
      optionValues.forEach((value) => {
        expect(customerEmails).toContain(value);
      });
    });
  });
  
  
  it('should set the selected customer and call setSelectedCustomer method', () => {
    const customers: Customer[] = [
      { userEmail: 'user1@example.com' }
      
    ];
  
    spyOn(usersService, 'getCustomers').and.returnValue(of(customers));
  
    component.ngOnInit();
  
    component.customers = customers;
  
    component.selectedCustomer = 'user1@example.com'; 
  
    const setSelectedCustomerSpy = spyOn(usersService, 'setSelectedCustomer'); 
  
    component.setSelectedCustomer();
  
    expect(setSelectedCustomerSpy).toHaveBeenCalledWith(customers[0]); 
  });
  
});
