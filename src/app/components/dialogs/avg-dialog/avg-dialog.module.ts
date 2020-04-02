import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { AvgDialogComponent } from "./avg-dialog.component";

@NgModule({
	declarations: [AvgDialogComponent],
	exports: [AvgDialogComponent],
	entryComponents: [AvgDialogComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbCarouselModule
	]
})
export class AvgDialogModule {}
