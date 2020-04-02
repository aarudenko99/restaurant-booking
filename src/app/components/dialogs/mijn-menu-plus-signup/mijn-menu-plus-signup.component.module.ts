// Angular
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";

// Pages
import { MijnMenuPlusSignupComponent } from "./mijn-menu-plus-signup.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [MijnMenuPlusSignupComponent],
	entryComponents: [MijnMenuPlusSignupComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialImportModule,
		PartialsModule,
		TranslateModule
	],
	providers: []
})
export class MijnMenuPlusSignUpDialogModule {}
