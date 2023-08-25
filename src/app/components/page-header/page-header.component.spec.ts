import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { PageHeaderComponent } from './page-header.component';
import { UsersService } from 'src/app/services/users.service';
import { Customer } from 'src/app/models/customer.model';

class MockUsersService {
  getCustomers(): Observable<Customer[]> {
    return of([{ userEmail: 'user1@example.com' }]);
  }
  }

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
      imports: [FormsModule],
      providers: [{ provide: UsersService, useClass: MockUsersService }],
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
    expect(component.selectedCustomerEmail).toBe('');
  });
});
