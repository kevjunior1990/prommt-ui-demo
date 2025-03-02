// src/app/core/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/v1/payment/'; // URL to your Spring Boot API

  constructor(private http: HttpClient) {}

  // Get all payments
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // Get a payment by ID
  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}${id}`);
  }

  // Create a new payment
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  // Update an existing payment
  updatePayment(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}${id}`, payment);
  }

  // Delete a payment by ID
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
