// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";

// Component
import { BillComponent } from "./bill.component";

// Modules
import { PartialsModule } from "../../views/partials/partials.module";
import { MaterialImportModule } from "../common/angular-material/material.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { OrderItemsComponent } from './order-items/order-items.component';

@NgModule({
	declarations: [BillComponent, OrderItemsComponent],
	exports: [BillComponent , OrderItemsComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		NgbPopoverModule,
		MaterialImportModule,
		PerfectScrollbarModule
	],
	providers: []
})
export class BillComponentModule {}
