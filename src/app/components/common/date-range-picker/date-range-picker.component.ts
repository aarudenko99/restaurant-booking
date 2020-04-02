import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'mm-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent {
    @ViewChild('d', { static: true }) private datePicker: NgbInputDatepicker;
    @Output() dateRangeSelection = new EventEmitter<{ from: string, to: string }>();
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    isOpen = false;

    constructor(calendar: NgbCalendar) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    onDateChange(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
            this.closeDatePicker();
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    closeDatePicker() {
        const dateRange = {
            from: moment(this.fromDate).format('DD-MM-YYYY'),
            to: moment(this.toDate).format('DD-MM-YYYY'),
        };
        this.dateRangeSelection.emit(dateRange);
        this.datePicker.close();
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);

    isFrom(date) {
        equals(date, this.fromDate);
    }

    isTo(date) {
        equals(date, this.toDate);
    }

    get formattedDateRange(): string {
        if (!this.fromDate) {
            return `missing start date`;
        }

        const fromFormatted = moment(this.fromDate).format('DD-MM-YYYY');

        return this.toDate
            ? `${fromFormatted}`
            + ` - `
            + `${moment(this.toDate).format('DD-MM-YYYY')}`
            : `${fromFormatted}`;

    }
}
