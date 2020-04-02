import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTableDialogComponent } from "./create-table-dialog.component";
import { FormsModule } from "@angular/forms";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {NumberOnlyDirective} from "../../../directives/number-only.directive";

@NgModule({
	declarations: [CreateTableDialogComponent, NumberOnlyDirective],
	exports: [CreateTableDialogComponent],
	entryComponents: [CreateTableDialogComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbTooltipModule
	]
})
export class CreateTableDialogModule {}
