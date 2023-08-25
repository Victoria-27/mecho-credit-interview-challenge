import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mecho-credit-interview-challenge';

  constructor(private userService: UsersService) {}

  ngOnInit() {}
}
