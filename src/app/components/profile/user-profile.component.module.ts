import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MatFormFieldModule,
	MatSlideToggleModule,
	MatDividerModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PartialsModule } from "../../views/partials/partials.module";
import { UserProfileAsideComponent } from "./user-profile-aside/user-profile-aside.component";
import { UserPersonalInformationComponent } from "./user-personal-information/user-personal-information.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { MollieConnectButtonModule } from "../common/mijn-menu-plus/mollie-connect-btn/mollie-connect-btn.module";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
	declarations: [
		UserProfileAsideComponent,
		UserPersonalInformationComponent,
		ChangePasswordComponent
	],
	exports: [
		UserProfileAsideComponent,
		UserPersonalInformationComponent,
		ChangePasswordComponent
	],
	imports: [
		CommonModule,
		PartialsModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MollieConnectButtonModule,
		MatSlideToggleModule,
		MatDividerModule,
		InlineSVGModule,
		TranslateModule.forChild()
	]
})
export class UserProfileComponentsModule {}
