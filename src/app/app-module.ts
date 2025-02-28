import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentService } from './payment.service';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
