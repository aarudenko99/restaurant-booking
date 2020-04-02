import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Offer } from '../../../common/models/offer';
import { OfferController } from '../../../controllers/offer/offer.controller';

@Component({
  selector: 'mm-offer-form-component',
  templateUrl: './offer-form-component.component.html',
  styleUrls: ['./offer-form-component.component.scss']
})
export class OfferFormComponent extends OfferController implements OnInit {
  @Input() offerType: string;
  offer: Offer = new Offer();
  description = '';

  constructor(
    injector: Injector,
    fb: FormBuilder
  ) {
      super(injector, fb);
  }

  ngOnInit() {
  }

  date(date) {
    console.log(date);
  }

  getOfferItem() {
    console.log(this.offerItemForm);
  }
}
