import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FullCalendarModule } from "@fullcalendar/angular";
import { PartialsModule } from "../../views/partials/partials.module";
import { CalendarComponent } from "./calendar/calendar.component";
import { ReservationManageListComponent } from "./reservation-manage-list/reservation-manage-list.component";
import {
	NgbDropdownModule,
	NgbPopoverModule,
	NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import { CalendarPopoverComponent } from "./calendar/calendar-popover/calendar-popover.component";
import { ReservationTableListComponent } from "./reservation-table-list/reservation-table-list.component";
import { MaterialImportModule } from "../common/angular-material/material.module";
import { ReservationDialogModule } from "../dialogs/reservation-dialog/reservation-dialog.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		CalendarComponent,
		ReservationManageListComponent,
		CalendarPopoverComponent,
		ReservationTableListComponent
	],
	exports: [
		CalendarComponent,
		ReservationManageListComponent,
		ReservationTableListComponent
	],
	entryComponents: [CalendarPopoverComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		FullCalendarModule,

		// ng-mat modules
		MaterialImportModule,

		// ng-bootstrap modules
		NgbPopoverModule,
		NgbDropdownModule,
		NgbTooltipModule,
		ReservationDialogModule
	]
})
export class ReservationComponentModule {}
