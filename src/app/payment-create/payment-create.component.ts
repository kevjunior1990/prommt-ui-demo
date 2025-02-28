import { Component } from '@angular/core';
import { PaymentStatus } from '../payment-status';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-create',
  imports: [
    FormsModule
  ],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.css'
})
export class PaymentCreateComponent {
  newPayment: Payment = {
    amount: 0,
    email: "",
    currency: "EUR",
    status: PaymentStatus.PENDING  // Default status is 'PENDING'
  };

  constructor(private paymentService: PaymentService) {}

  // Method to create a new payment
  createPayment(): void {
    this.paymentService.createPayment(this.newPayment).subscribe(
      (data) => {
        console.log('Payment created', data);
        // After creating the payment, navigate back to payment list or show success message
      },
      (error) => {
        console.error('Error creating payment', error);
      }
    );
  }
}
