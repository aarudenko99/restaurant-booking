import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PartialsModule } from "../../views/partials/partials.module";
import { WizzardComponent } from "./wizzard.component";
import {
	NgbTooltipModule,
	NgbTimepickerModule
} from "@ng-bootstrap/ng-bootstrap";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from "@ngx-translate/core";
import {
	MatFormFieldModule,
	MatCheckboxModule,
	MatChipsModule
} from "@angular/material";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

// Components
import { RestaurantSetupComponent } from "./restaurant-setup/restaurant-setup.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { RestaurantCategoriesModule } from "../common/restaurant-categories/restaurant-categories.module";
import { RestaurantFeaturesComponent } from "./restaurant-features/restaurant-features.component";
import { RestaurantBillingInfoComponent } from "./restaurant-billing-info/restaurant-billing-info.component";
import { ReviewAndSubmitComponent } from "./review-and-submit/review-and-submit.component";
import { ImageGalleryComponentsModule } from "../common/img-gallery/img-gallery.module";
import { RestaurantTagsModule } from "../restaurant-tags/restaurant-tags.module";
import { RestaurantFeaturesCheckboxesModule } from "../common/restaurant-features-checkboxes/restaurant-features-checkboxes.module";
import { DateRangePickerModule } from "../common/date-range-picker/date-range-picker.module";
import { SetupLocationDialogModule } from "../dialogs/setup-location/setup-location.module";

@NgModule({
	declarations: [
		WizzardComponent,
		RestaurantSetupComponent,
		RestaurantDetailsComponent,
		RestaurantFeaturesComponent,
		RestaurantBillingInfoComponent,
		ReviewAndSubmitComponent
	],
	exports: [WizzardComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		PartialsModule,
		GooglePlaceModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule,
		SweetAlert2Module,
		SetupLocationDialogModule,
		MatChipsModule,
		DateRangePickerModule,
		ImageGalleryComponentsModule, // TODO Create 1 component Restaurant detail e.g
		RestaurantCategoriesModule, // TODO Create 1 component Restaurant detail e.g
		RestaurantTagsModule, // TODO Create 1 component Restaurant detail e.g
		RestaurantFeaturesCheckboxesModule, // TODO Create 1 component Restaurant detail e.g

		// ngBootstrap
		NgbTooltipModule,
		NgbTimepickerModule
	]
})
export class WizzardComponentsModule {}
