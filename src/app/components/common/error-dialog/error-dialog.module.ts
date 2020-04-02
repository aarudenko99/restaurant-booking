import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorDialogComponent } from "./error-dialog.component";
import { PartialsModule } from "../../../views/partials/partials.module";

@NgModule({
	declarations: [ErrorDialogComponent],
	entryComponents: [ErrorDialogComponent],
	exports: [ErrorDialogComponent],
	imports: [CommonModule, PartialsModule]
})
export class ErrorDialogModule {}
