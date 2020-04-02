// Angular
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";

// Component
import { MollieSubscriptionComponent } from "./mollie-subscription.component";

@NgModule({
	declarations: [MollieSubscriptionComponent],
	exports: [MollieSubscriptionComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, InlineSVGModule],
	providers: []
})
export class MollieSubscriptionModule {}
