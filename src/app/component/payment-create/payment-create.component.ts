import { Component } from '@angular/core';
import { PaymentStatus } from '../../enum/payment-status';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../service/payment.service';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-create',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.css',
})
export class PaymentCreateComponent {

  newPayment: Payment = this.resetPayment();

  constructor(private paymentService: PaymentService, private snackBar: MatSnackBar) {
  }

  // Method to create a new payment
  createPayment(): void {
    this.paymentService.createPayment(this.newPayment).subscribe(
      (data) => {

        console.log('Payment created', data);
        this.newPayment = this.resetPayment();

        this.snackBar.open('Payment created successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'toast-success' // Apply your custom CSS class
        });
      },
      (error) => {

        console.error('Error creating payment', error);

        this.snackBar.open(`Error creating payment: ${error.message || error}`, 'Close', {
          duration: 5000, // 5 seconds (adjust as needed)
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'toast-error' // Apply error CSS class (optional)
        });
      }
    );
  }

  resetPayment(): Payment {

    return {
      amount: 0,
      email: '',
      currency: 'EUR',
      status: PaymentStatus.PENDING  // Default status is 'PENDING'
    };
  }
}
