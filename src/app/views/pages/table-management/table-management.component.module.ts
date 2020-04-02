// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule, MatButtonModule } from "@angular/material";
// Pages
import { TableManagementPageComponent } from "./table-management.component";

// Modules
import { TranslateModule } from "@ngx-translate/core";
import { PartialsModule } from "../../partials/partials.module";
import { ReservationComponentModule } from "../../../components/reservations/reservation.module";
import { TableManagementComponentsModule } from "../../../components/table-management/table-management.module";
import { TopDataItemModule } from "../../../components/common/top-data-item/top-data-item.module";
import { OrderQuantityModule } from "../../../components/common/order-quantity/order-quantity.module";
import { CreateFloorPlanDialogModule } from "../../../components/dialogs/create-floorplan-dialog/create-floorplan-dialog.module";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [TableManagementPageComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		ReservationComponentModule,
		MatButtonModule,
		MatIconModule,
		TableManagementComponentsModule,
		TopDataItemModule,
		OrderQuantityModule,
		CreateFloorPlanDialogModule,
		TranslateModule,
		NgbPopoverModule
	],
	providers: []
})
export class TableManagementModule {}
