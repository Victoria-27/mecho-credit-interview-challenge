import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestComponent } from './request.component';
import { UsersService } from 'src/app/services/users.service';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [RequestComponent],
      providers: [{ provide: UsersService, useClass: UsersService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should update method selected when method is changed', () => {
  component.ngOnInit()
component.requestForm.controls['method'].setValue('cash');
expect(component.methodSelected).toBe(true)
});

it('should update typeSelected when type value changes', () => {
  component.ngOnInit();
  component.requestForm.controls['type'].setValue('servicing');

  expect(component.typeSelected).toBe(true);
});

});