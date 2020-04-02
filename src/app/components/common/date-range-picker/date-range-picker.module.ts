import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './date-range-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [DateRangePickerComponent],
    exports: [DateRangePickerComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgbDatepickerModule
    ]
})
export class DateRangePickerModule { }
