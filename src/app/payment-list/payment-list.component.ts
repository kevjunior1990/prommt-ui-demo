import { Component, OnInit } from '@angular/core';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { NgFor, NgIf } from '@angular/common';
import { PaymentStatus } from '../payment-status';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-list',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit{
  payments: Payment[] = [];
  selectedPayment: Payment | null = null;

  selectedUpdatePayment: boolean = false;
  selectedDeletePayment: boolean = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  // Load all payments from the service
  loadPayments(): void {
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.payments = data;
      },
      (error) => {
        console.error('Error loading payments', error);
      }
    );
  }

  isPaymentPending(status: PaymentStatus): boolean {

    return PaymentStatus.PENDING === status;
  }

  confirmUpdate(payment: Payment): void {
    if (confirm("Are you sure you want to complete this payment?")) {
      this.updatePayment(payment);
    }
  }

  // Update an existing payment
  updatePayment(payment: Payment): void {
    if (payment) {
      payment.status = PaymentStatus.COMPLETED;

      this.paymentService.updatePayment(payment.id!, payment).subscribe(
        (data) => {
          console.log('Payment updated', data);
          this.loadPayments();  // Refresh payment list
        },
        (error) => {
          console.error('Error updating payment', error);
        }
      );
    }
  }

  confirmDelete(id: number): void {
    if (confirm("Are you sure you want to delete this payment?")) {
      this.deletePayment(id);
    }
  }

  // Delete payment
  deletePayment(id: number): void {
    this.paymentService.deletePayment(id).subscribe(
      () => {
        console.log('Payment deleted');
        this.loadPayments();  // Reload the list after deletion
      },
      (error) => {
        console.error('Error deleting payment', error);
      }
    );
  }
}
