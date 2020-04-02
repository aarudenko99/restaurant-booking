import { Component, OnInit, Input } from '@angular/core';
import { RestaurantFeatures } from '../../../common/models/restaurant-features';
import { WizardService } from '../../../services/wizard.service';

@Component({
	selector: 'mm-restaurant-features-checkboxes',
	templateUrl: './restaurant-features-checkboxes.component.html',
	styleUrls: ['./restaurant-features-checkboxes.component.scss']
})
export class RestaurantFeaturesCheckboxesComponent implements OnInit {
	@Input() features: Array<RestaurantFeatures>;

	constructor(private wizardService: WizardService) {}

	ngOnInit() {}

	checkCheckBox() {
		this.wizardService.formData.RestaurantFeatures = this.features.filter(
			item => item.checked === true
		);
	}
}
