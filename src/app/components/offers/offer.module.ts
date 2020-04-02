import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatChipsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../views/partials/partials.module';
import { DateRangePickerModule } from '../common/date-range-picker/date-range-picker.module';

import { OfferFormComponent } from './offer-form-component/offer-form-component.component';

@NgModule({
    declarations: [ OfferFormComponent ],
    exports: [ OfferFormComponent ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PartialsModule,
        MatCardModule,
        MatChipsModule,
        DateRangePickerModule
    ]
})
export class OffersModule { }
