import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { WizardService } from "../../../services/wizard.service";
import { WizardController } from "../../../controllers/wizard/wizard.controller";

@Component({
	selector: "mm-restaurant-setup",
	templateUrl: "./restaurant-setup.component.html",
	styleUrls: ["./restaurant-setup.component.scss"]
})
export class RestaurantSetupComponent extends WizardController
	implements OnInit {
	@ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
	options = {
		types: ["establishment"],
		componentRestrictions: { country: "NL" }
	};

	constructor(injector: Injector, public wizardService: WizardService) {
		super(injector);
	}

	ngOnInit() {
		this.setupWizardForms("setup");
		this.wizardService.formData.Country = "NL";
	}

	handleAddressChange(place: Address) {
		this.wizardService.formData.Lat = place.geometry.location.lat();
		this.wizardService.formData.Long = place.geometry.location.lng();
		this.wizardService.formData.place_id = place.place_id;
		this.wizardService.formData.Name = place.name;
		this.wizardService.formData.PhoneNumber =
			place.international_phone_number;
		this.wizardService.formData.Address = place.vicinity;
		this.wizardService.formData.OpeningHours = place.opening_hours
			? place.opening_hours.periods
			: null;
		console.log("handleAddressChange", this.wizardService.formData, place);
		this.getFormattedAddress(place);
	}

	handleInputChange(input: string) {
		console.log("test", input);
		this.wizardService.formData.Name = input;
	}

	// @params: place - Google Autocomplete place object
	// @returns: locationObj - An address object in human readable format
	getFormattedAddress(place) {
		for (const i in place.address_components) {
			if (place.address_components[i]) {
				const item = place.address_components[i];

				if (item.types.indexOf("locality") > -1) {
					this.wizardService.formData.City = item.long_name;
				} else if (
					item.types.indexOf("administrative_area_level_1") > -1
				) {
					this.wizardService.formData.State = item.long_name;
				} else if (item.types.indexOf("country") > -1) {
					this.wizardService.formData.Country = item.short_name;
				} else if (item.types.indexOf("postal_code") > -1) {
					this.wizardService.formData.Zip = item.short_name;
				}
			}
		}
	}
}
