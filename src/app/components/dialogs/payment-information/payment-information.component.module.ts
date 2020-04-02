// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material";
import { PartialsModule } from "../../../views/partials/partials.module";

// Components
import { PaymentInformationComponent } from "./payment-information.component";
import { MollieSubscriptionModule } from "../../common/mijn-menu-plus/mollie-subscription/mollie-subscription.component.module";

@NgModule({
	declarations: [PaymentInformationComponent],
	entryComponents: [PaymentInformationComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MatButtonModule,
		MollieSubscriptionModule
	],
	exports: []
})
export class PaymentInfoDialogModule {}
