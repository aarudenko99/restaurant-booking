// Angular
import { NgModule } from '@angular/core';
// Pages
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialImportModule } from '../../common/angular-material/material.module';

import { ReservationDialogComponent } from './reservation-dialog.component';
import { MatDatepickerModule } from '@angular/material';
import { MatDatetimepickerModule, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';


@NgModule({
    declarations: [ReservationDialogComponent],
    entryComponents: [ReservationDialogComponent],
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialImportModule,
        NgbTooltipModule,

        MatDatepickerModule,
        // use this if you want to use native javascript dates and INTL API if available
        // MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatetimepickerModule
    ],
    providers: [
        // {
        //     provide: MAT_DATETIME_FORMATS,
        //     useValue: {
        //         parse: {},
        //         display: {
        //             dateInput: {year: 'numeric', month: '2-digit', day: '2-digit'},
        //             monthInput: {month: 'long'},
        //             datetimeInput: {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'},
        //             timeInput: {hour: '2-digit', minute: '2-digit'},
        //             monthYearLabel: {year: 'numeric', month: 'short'},
        //             dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        //             monthYearA11yLabel: {year: 'numeric', month: 'long'},
        //             popupHeaderDateLabel: {weekday: 'short', month: 'short', day: '2-digit'}
        //         }
        //     }
        // }
    ]
})
export class ReservationDialogModule {}
