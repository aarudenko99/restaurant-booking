import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MatButtonModule,
	MatRippleModule,
	MatIconModule,
	MatChipsModule,
	MatDividerModule
} from "@angular/material";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PartialsModule } from "../../views/partials/partials.module";
import { OrderTicketComponent } from "./order-ticket/order-ticket.component";
import { EditTableOrderDialogModule } from "../dialogs/edit-table-order/edit-table-order.module";

@NgModule({
	declarations: [OrderTicketComponent],
	exports: [OrderTicketComponent],
	imports: [
		CommonModule,
		PartialsModule,
		MatButtonModule,
		MatIconModule,
		MatRippleModule,
		MatChipsModule,
		NgbPopoverModule,
		InlineSVGModule,
		PerfectScrollbarModule,
		MatDividerModule,
		EditTableOrderDialogModule
	]
})
export class OrderTicketModule {}
