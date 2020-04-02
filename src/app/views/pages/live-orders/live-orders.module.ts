import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTicketModule } from '../../../components/orders/orders.module';
import { LiveOrdersComponent } from './live-orders.component';
import { PartialsModule } from '../../partials/partials.module';

@NgModule({
  declarations: [LiveOrdersComponent],
  imports: [
    CommonModule,
    PartialsModule,
    OrderTicketModule
  ]
})
export class OrdersPageModule { }
