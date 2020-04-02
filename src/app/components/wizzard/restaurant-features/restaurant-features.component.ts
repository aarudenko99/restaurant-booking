import { Component, OnInit, Input } from "@angular/core";
import { WizardService } from "../../../services/wizard.service";
import { RestaurantService } from "../../../services/restaurant.service";
import { RestaurantFeatures } from "../../../common/models/restaurant-features";

@Component({
	selector: "mm-restaurant-features",
	templateUrl: "./restaurant-features.component.html",
	styleUrls: ["./restaurant-features.component.scss"]
})
export class RestaurantFeaturesComponent implements OnInit {
	features: Array<RestaurantFeatures>;

	constructor(
		private restaurantService: RestaurantService,
		public wizardService: WizardService
	) {}

	ngOnInit() {
		this.restaurantService.getRestaurantFeatures().subscribe(features => {
			this.features = features.data;

			// Get value of checkboxes and fill them
			if (
				this.wizardService.editRestaurant.value &&
				this.wizardService.formData.RestaurantFeatures.length
			) {
				this.features.map(feature => {
					this.wizardService.formData.RestaurantFeatures.filter(e => {
						if (e._id === feature._id) {
							feature.checked = true;
						}
					});
				});
			}
		});
	}
}
