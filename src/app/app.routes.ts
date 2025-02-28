import { RouterModule, Routes } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { NgModule } from '@angular/core';
import { PaymentCreateComponent } from './payment-create/payment-create.component';

export const routes: Routes = [
  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/create', component: PaymentCreateComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
