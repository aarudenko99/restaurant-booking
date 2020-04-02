import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PartialsModule } from "../../views/partials/partials.module";
import { FloorPlanComponent } from "./floor-plan/floor-plan.component";
import { TableComponent } from "./table/table.component";
import {
	MatIconModule,
	MatButtonModule,
	MatMenuModule
} from "@angular/material";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";
import { TranslateModule } from "@ngx-translate/core";
import { TableBillDialogModule } from "../dialogs/table-bill/table-bill.component.module";
import { QrCodeDialogModule } from "../common/qr-code/qr-code.module";

@NgModule({
	declarations: [FloorPlanComponent, TableComponent],
	exports: [FloorPlanComponent, TableComponent],
	entryComponents: [],
	imports: [
		MatIconModule,
		MatButtonModule,
		CommonModule,
		PartialsModule,
		DragDropModule,
		FormsModule,
		NgbPopoverModule,
		MatMenuModule,
		InlineSVGModule,
		TranslateModule,
		ReactiveFormsModule,
		TableBillDialogModule,
		QrCodeDialogModule
	]
})
export class TableManagementComponentsModule {}
