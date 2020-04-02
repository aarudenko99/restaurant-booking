import { Injector } from '@angular/core';
import { AbstractController } from '../abstract/abstract.controller';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


export abstract class OfferController extends AbstractController {

    offerItemForm: FormGroup;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
        this.offerItemForm = this.fb.group({
          Title: ['', Validators.required],
          Description: '',
          OfferType: '',
          StartDate: [''],
          EndDate: ['', Validators.required],
          Discount: ['', Validators.required],
      });
    }

}
