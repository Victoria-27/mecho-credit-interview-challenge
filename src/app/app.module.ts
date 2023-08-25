import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RequestComponent } from './components/request/request.component';
import { ListRequestComponent } from './components/list-request/list-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RequestComponent,
    ListRequestComponent,
    PageHeaderComponent,
  ],
  imports: [BrowserModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
