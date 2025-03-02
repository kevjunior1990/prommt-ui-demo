import { PaymentStatus } from '../enum/payment-status'; // Assuming you have an enum for PaymentStatus

export class Payment {
  id?: number;
  email: string;
  status: PaymentStatus;
  currency: string;
  amount: number; // Represents BigDecimal as a float or number in TypeScript

  constructor(
    id: number,
    email: string,
    status: PaymentStatus,
    currency: string,
    amount: number
  ) {
    this.id = id;
    this.email = email;
    this.status = status;
    this.currency = currency;
    this.amount = amount;
  }
}
