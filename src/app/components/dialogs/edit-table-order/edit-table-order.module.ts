import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { EditTableOrderComponent } from "./edit-table-order.component";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
	declarations: [EditTableOrderComponent],
	exports: [EditTableOrderComponent],
	entryComponents: [EditTableOrderComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbTooltipModule,
		PerfectScrollbarModule,
		InlineSVGModule
	]
})
export class EditTableOrderDialogModule {}
