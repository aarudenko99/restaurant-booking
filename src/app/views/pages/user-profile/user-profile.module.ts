// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Pages
import { UserProfilePageComponent } from "./user-profile.component";

// Modules
import { UserProfileComponentsModule } from "../../../components/profile/user-profile.component.module";
import { MollieSubscriptionModule } from "../../../components/common/mijn-menu-plus/mollie-subscription/mollie-subscription.component.module";
import { PartialsModule } from "../../partials/partials.module";

@NgModule({
	declarations: [UserProfilePageComponent],
	exports: [],
	imports: [
		CommonModule,
		PartialsModule,
		UserProfileComponentsModule,
		MollieSubscriptionModule
	],
	providers: []
})
export class UserProfileModule {}
