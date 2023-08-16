import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/models/request.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  requestForm!: FormGroup;
  customers: Customer[] = [];
  request: Request[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
    this.request = this.requestService.getRequests();

    this.requestForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      amount: ['0', [Validators.required, Validators.min(0)]],
      method: ['credit', Validators.required],
      type: ['', Validators.required],
    });
  }

  creatRequest() {
    if (this.requestForm.valid) {
      const request: Request = this.requestForm.value;
      if (this.requestService.createRequest(request)) {
        this.customers = this.customerService.getCustomers();
        this.request = this.requestService.getRequests();
      } else {
        // Handle error
        alert(
          'Error creating request. Please check your balance and try again'
        );
      }
    } else {
      // Handle from validation errors
      alert('Please fill all the required fields and fix validation errors');
    }
  }
}
