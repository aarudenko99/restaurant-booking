import { Offer } from './../../../common/models/offer';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { OfferService } from '../../../services/offer.service';
import { OfferFormComponent } from '../../offers/offer-form-component/offer-form-component.component';

@Component({
  selector: 'mm-offers-dialog',
  templateUrl: './offers-dialog.component.html',
  styleUrls: ['./offers-dialog.component.scss']
})
export class OffersDialogComponent implements OnInit {
  @ViewChild('menuItem', { static: true }) menuItemElement: OfferFormComponent;
  @ViewChild('billing', { static: true }) billingElement: OfferFormComponent;
  @ViewChild('discountCode', { static: true }) discountCodeElement: OfferFormComponent;

  edit: boolean;
  offerType: string;
  selectedIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<OffersDialogComponent>,
    private offerService: OfferService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      console.log('dataaaaa', data);
      this.offerType = data.OfferType;
      this.edit = data.edit;
      this.setSelectedIndex(data.OfferType);
    }
  }

  ngOnInit() {
  }

  addOffer() {
    if (this.offerType === 'MenuItem') {
      console.log(this.menuItemElement.offer);
    }
    if (this.offerType === 'Billing') {
      console.log(this.billingElement.offer);
    }
    if (this.offerType === 'DiscountCode') {
      console.log(this.discountCodeElement.offer);
    }
  }

  tabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.offerType = 'MenuItem';
        break;
      case 1:
        this.offerType = 'Billing';
        break;
      case 2:
        this.offerType = 'DiscountCode';
        break;
    }
  }

  setSelectedIndex(type) {
    switch (type) {
      case 'MenuItem':
        this.offerType = type;
        this.selectedIndex = 0;
        break;
      case 'Billing':
        this.offerType = type;
        this.selectedIndex = 1;
        break;
      case 'DiscountCode':
        this.offerType = type;
        this.selectedIndex = 2;
        break;
      default:
        this.selectedIndex = 0;
        break;
    }
  }

}
