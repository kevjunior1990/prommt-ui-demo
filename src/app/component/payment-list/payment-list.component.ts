import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../service/payment.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PaymentStatus } from '../../enum/payment-status';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-list',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    NgxPaginationModule,
    OrderModule,
    NgClass
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  order: string = 'id';
  reverse: boolean = false;
  isLoading: boolean = true;
  private loadPaymentsSubscription!: Subscription;
  private updatePaymentSubscription!: Subscription;
  private deletePaymentSubscription!: Subscription;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  // Load all payments from the service
  loadPayments(): void {

    this.isLoading = true;  // Show loading bar
    this.loadPaymentsSubscription = this.paymentService.getPayments().subscribe(
      (data) => {

        this.payments = data;
        this.isLoading = false;
      },
      (error) => {

        console.error('Error loading payments', error);
        this.isLoading = false;
      }
    );
  }

  isPaymentPending(status: PaymentStatus): boolean {

    return PaymentStatus.PENDING === status;
  }

  confirmUpdate(payment: Payment): void {
    if (confirm('Are you sure you want to complete this payment?')) {
      this.updatePayment(payment);
    }
  }

  // Update an existing payment
  updatePayment(payment: Payment): void {
    if (payment) {
      payment.status = PaymentStatus.COMPLETED;

      this.updatePaymentSubscription = this.paymentService.updatePayment(payment.id!, payment).subscribe(
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
    if (confirm('Are you sure you want to delete this payment?')) {
      this.deletePayment(id);
    }
  }

  // Delete payment
  deletePayment(id: number): void {
    this.deletePaymentSubscription = this.deletePaymentSubscription = this.paymentService.deletePayment(id).subscribe(
      () => {
        console.log('Payment deleted');
        this.loadPayments();  // Reload the list after deletion
      },
      (error) => {
        console.error('Error deleting payment', error);
      }
    );
  }

  setOrder(column: string) {
    if (this.order === column) {
      this.reverse = !this.reverse;
    } else {
      this.order = column;
      this.reverse = false;
    }
  }

  getArrowClass(column: string): string {
    if (this.order === column) {
      return this.reverse ? 'arrow down' : 'arrow up';
    }
    return 'arrow';
  }

  ngOnDestroy() {

    if (this.loadPaymentsSubscription) {
      this.loadPaymentsSubscription.unsubscribe();
    }

    if (this.updatePaymentSubscription) {
      this.updatePaymentSubscription.unsubscribe();
    }

    if (this.deletePaymentSubscription) {
      this.deletePaymentSubscription.unsubscribe();
    }
  }
}
