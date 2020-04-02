import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../angular-material/material.module";
import { QrCodeComponent } from "./qr-code.component";

@NgModule({
	declarations: [QrCodeComponent],
	exports: [QrCodeComponent],
	entryComponents: [QrCodeComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MaterialImportModule,
		NgbTooltipModule
	]
})
export class QrCodeDialogModule {}
