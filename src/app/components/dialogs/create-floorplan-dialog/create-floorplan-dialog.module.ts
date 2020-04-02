import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateFloorplanDialog } from "./create-floorplan-dialog";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [CreateFloorplanDialog],
	exports: [CreateFloorplanDialog],
	entryComponents: [CreateFloorplanDialog],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbTooltipModule,
		TranslateModule
	]
})
export class CreateFloorPlanDialogModule {}
