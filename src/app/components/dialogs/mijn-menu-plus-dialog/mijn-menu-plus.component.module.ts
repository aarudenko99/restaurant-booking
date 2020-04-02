// Angular
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";

import { MollieConnectButtonModule } from "../../common/mijn-menu-plus/mollie-connect-btn/mollie-connect-btn.module";
// Pages
import { MijnMenuPlusComponent } from "./mijn-menu-plus.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { IconBoxWavesModule } from "../../common/icon-box-wave/icon-box-wave.module";
import { AngularIbanModule } from "angular-iban";

@NgModule({
	declarations: [MijnMenuPlusComponent],
	entryComponents: [MijnMenuPlusComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialImportModule,
		MollieConnectButtonModule,
		PerfectScrollbarModule,
		IconBoxWavesModule,
		AngularIbanModule,
		PartialsModule
	],
	providers: []
})
export class MijnMenuPlusDialogModule {}
