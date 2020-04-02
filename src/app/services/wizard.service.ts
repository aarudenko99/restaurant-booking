import { Injectable } from "@angular/core";
import { Restaurant } from "../common/models/restaurant";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../core/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class WizardService {
	type: string;
	form: FormGroup;
	restaurantCategories;
	formData: Restaurant = new Restaurant();
	editRestaurant: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);
	private isRestaurantSetupFormValid: boolean = false;
	private isDetailsFormValid: boolean = false;
	private isAddressFormValid: boolean = false;

	constructor(private auth: AuthService) {}

	// getFormData(): FormData {
	//     // Return the entire Form Data
	//     return this.formData;
	// }

	// resetFormData(): FormData {
	//     // Return the form data after all this.* members had been reset
	//     this.formData.clear();
	//     this.isRestaurantSetupFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
	//     return this.formData;
	// }

	public submit(form) {
		this.form = form;
		const controls = form.controls;
		/** check form */
		if (form.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.formData.UserId = this.auth.getUserId();

		switch (this.type) {
			case "setup":
				this.isRestaurantSetupFormValid = true;
				break;
			case "details":
				this.isDetailsFormValid = true;
				break;
		}

		// console.log('HOOORAYYY', this.isRestaurantSetupFormValid);
	}

	isFormValid() {
		// Return true if all forms had been validated successfully; otherwise, return false
		return this.isRestaurantSetupFormValid && this.isDetailsFormValid;
		// this.isAddressFormValid;
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		if (!this.form) {
			return;
		}
		const control = this.form.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
