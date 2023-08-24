import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListRequestComponent } from './list-request.component';
import { UsersService } from 'src/app/services/users.service';
import { Subject, of } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { Customer } from 'src/app/models/customer.model';

describe('ListRequestComponent', () => {
  let component: ListRequestComponent;
  let fixture: ComponentFixture<ListRequestComponent>;
  let usersService: UsersService;
  let selectedCustomerSubject: Subject<Customer>;

  beforeEach(async () => {
    selectedCustomerSubject = new Subject<Customer>();

    await TestBed.configureTestingModule({
      declarations: [ListRequestComponent],
      imports: [HttpClientModule],
      providers: [
        UsersService,
        { provide: UsersService, useValue: { selectedCustomer$: selectedCustomerSubject.asObservable() } } // Override the original provider with a mock one
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRequestComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);

    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify([
        {},
       
      ])
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate requests from sessionStorage on init', () => {
    const requests: Request[] = [];
    spyOn(JSON, 'parse').and.returnValue({ requests });

    component.ngOnInit();

    expect(component.requests).toEqual(requests);
  });

  it('should populate requests from selectedCustomer$ subscription', () => {
    const customer: Customer = { requests: [] };
  
    selectedCustomerSubject.next(customer); 

    
    fixture.detectChanges();
  
    fixture.detectChanges();
  
    expect(component.requests).toEqual(customer.requests);
});

  it('should display request details when requests are available', () => {
    const requests: Request[] = [
      { userEmail: 'user1@example.com', amount: 100, method: 'cash', type: 'inspection', createdAt: new Date().toISOString() },
      { userEmail: 'user2@example.com', amount: 200, method: 'credit', type: 'servicing', createdAt: new Date().toISOString() }
    ];

    component.requests = requests;
    fixture.detectChanges();

    const requestElements = fixture.nativeElement.querySelectorAll('.border');
    expect(requestElements.length).toBe(requests.length);

    requestElements.forEach((element: any, index: any) => {
      const request = requests[index];
      expect(element.textContent).toContain(request.userEmail);
      expect(element.textContent).toContain(request.amount);
      expect(element.textContent).toContain(request.method);
      expect(element.textContent).toContain(request.type);

      expect(element.textContent).toContain(new Date(request.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    });
  });
});
