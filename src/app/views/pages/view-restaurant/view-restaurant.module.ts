// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MatButtonModule,
	MatDividerModule,
	MatTabsModule,
	MatIconModule,
	MatTooltipModule,
	MatCheckboxModule
} from "@angular/material";
import { FormsModule } from "@angular/forms";
// Core Module
import { InlineSVGModule } from "ng-inline-svg";
import { PartialsModule } from "../../partials/partials.module";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { RestaurantCategoriesModule } from "../../../components/common/restaurant-categories/restaurant-categories.module";
import { GoogleMapModule } from "../../../components/common/google-map/google-map.module";
import { ViewRestaurantComponent } from "./view-restaurant.component";
import { MollieSubscriptionModule } from "../../../components/common/mijn-menu-plus/mollie-subscription/mollie-subscription.component.module";

@NgModule({
	declarations: [ViewRestaurantComponent],
	exports: [ViewRestaurantComponent],
	imports: [
		CommonModule,
		PartialsModule,
		FormsModule,
		RestaurantCategoriesModule,
		GoogleMapModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatTooltipModule,
		MatTabsModule,
		MatCheckboxModule,
		NgbCarouselModule,
		InlineSVGModule,
		MollieSubscriptionModule
	],
	providers: []
})
export class ViewRestaurantPageModule {}
