import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateSideDishComponent } from "./create-side-dish.component";

@NgModule({
	declarations: [CreateSideDishComponent],
	exports: [CreateSideDishComponent],
	entryComponents: [CreateSideDishComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbTooltipModule
	]
})
export class CreateSideDishDialogModule {}
