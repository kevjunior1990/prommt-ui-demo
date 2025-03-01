import { Component } from '@angular/core';
import { PaymentStatus } from '../payment-status';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-payment-create',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.css'
})
export class PaymentCreateComponent {

  newPayment: Payment = this.resetPayment();

  constructor(private paymentService: PaymentService) {}

  confirmCreate(): void {
    if (confirm("Are you sure you want to delete this payment?")) {
      this.createPayment();
    }
  }

  // Method to create a new payment
  createPayment(): void {
    this.paymentService.createPayment(this.newPayment).subscribe(
      (data) => {

        console.log('Payment created', data);
        this.newPayment = this.resetPayment();
        // After creating the payment, navigate back to payment list or show success message
      },
      (error) => {

        console.error('Error creating payment', error);
      }
    );
  }

  resetPayment(): Payment {

    return {
      amount: 0,
      email: "",
      currency: "EUR",
      status: PaymentStatus.PENDING  // Default status is 'PENDING'
    };
  }
}
