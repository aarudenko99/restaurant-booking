import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountBarComponent } from './discount-bar.component'
import { PartialsModule } from '../../views/partials/partials.module';
import { MatButtonModule } from '@angular/material';
import { OffersModule } from '../offers/offer.module';
import { OffersDialogModule } from '../dialogs/offers-dialog/offers-dialog.module';



@NgModule({
  declarations: [DiscountBarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    PartialsModule,
    OffersModule,
    OffersDialogModule
  ],
  exports: [DiscountBarComponent]
})
export class DiscountBarModule { }
