import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from "../../../services/restaurant.service";
import { Restaurant } from "../../../common/models/restaurant";
import { WizardService } from "../../../services/wizard.service";

@Component({
	selector: "kt-create-restaurant",
	templateUrl: "./create-restaurant.component.html",
	styleUrls: ["./create-restaurant.component.scss"]
})
export class CreateRestaurantPageComponent implements OnInit {
	loaded: boolean = false;
	restaurant: Restaurant;

	constructor(
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private restaurantService: RestaurantService,
		private wizardService: WizardService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params && params.id) {
				this.wizardService.editRestaurant.next(true);
				this.restaurantService.getRestaurantById(params.id).subscribe(
					data => {
						this.restaurant = data.data[0];
						this.loaded = true;
						this.cd.detectChanges();
					},
					error => {}
				);
			} else {
				this.loaded = true;
				this.restaurant = null;
				this.wizardService.formData = new Restaurant();
				this.wizardService.editRestaurant.next(false);
			}
		});
	}
}
