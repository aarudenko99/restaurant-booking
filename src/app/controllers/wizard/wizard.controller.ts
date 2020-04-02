import { Injector } from "@angular/core";
import { AbstractController } from "../abstract/abstract.controller";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { WizardService } from "../../services/wizard.service";

export abstract class WizardController extends AbstractController {
	form: FormGroup;
	validationMessages: any;
	wizardService: WizardService;
	private fb: FormBuilder;

	constructor(injector: Injector) {
		super(injector);
		this.fb = this.injector.get(FormBuilder);
	}

	setupWizardForms(type: string) {
		switch (type) {
			case "setup":
				this.setupRestaurantForm();
				break;
			case "details":
				this.restaurantDetailForm();
				break;
			case "features":
				this.restaurantFeaturesForm();
				break;
		}
		this.wizardService.form = this.form;
	}

	setupRestaurantForm() {
		this.form = this.fb.group({
			name: [
				this.wizardService.formData.Name
					? this.wizardService.formData.Name
					: "",
				Validators.compose([
					Validators.required,
					Validators.minLength(3)
				])
			],
			address: [
				this.wizardService.formData.Address
					? this.wizardService.formData.Address
					: "",
				Validators.required
			],
			postalcode: [
				this.wizardService.formData.Zip
					? this.wizardService.formData.Zip
					: "",
				Validators.required
			],
			city: [
				this.wizardService.formData.City
					? this.wizardService.formData.City
					: "",
				Validators.required
			],
			state: [
				this.wizardService.formData.State
					? this.wizardService.formData.State
					: "",
				Validators.required
			],
			country: [
				this.wizardService.formData.Country
					? this.wizardService.formData.Country
					: "",
				Validators.required
			]
		});

		this.validationMessages = {
			name: [
				{ type: "required", message: "Please enter restaurant name." },
				{
					type: "minlength",
					message:
						"Restaurant name must be at least 3 characters long."
				}
			],
			address: [{ type: "required", message: "Please enter address." }],
			postalcode: [
				{ type: "required", message: "Please enter postal code." }
			],
			city: [{ type: "required", message: "Please enter city." }],
			state: [{ type: "required", message: "Please enter state." }],
			country: [{ type: "required", message: "Please enter country." }]
		};
	}

	restaurantDetailForm() {
		this.form = this.fb.group({
			phone: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3)
				])
			],
			email: [
				"",
				Validators.compose([Validators.required, Validators.email])
			],
			category: ["", Validators.required]
		});

		this.validationMessages = {
			phone: [
				{
					type: "required",
					message: "Please enter restaurant phone number."
				},
				{
					type: "minlength",
					message:
						"Restaurant phone number must be at least 3 characters long."
				}
			],
			email: [{ type: "required", message: "Please enter address." }],
			category: [
				{
					type: "required",
					message: "Please select your restaurant category."
				}
			]
		};
	}

	restaurantFeaturesForm() {
		this.form = this.fb.group({
			totalseats: ["", Validators.required]
		});

		this.validationMessages = {
			totalseats: [
				{
					type: "required",
					message: "Please enter restaurants total seats."
				},
				{
					type: "minlength",
					message:
						"Restaurant phone number must be at least 3 characters long."
				}
			]
		};
	}

	get name() {
		return this.form.get("name");
	}
	get address() {
		return this.form.get("address");
	}
	get postalcode() {
		return this.form.get("postalcode");
	}
	get city() {
		return this.form.get("city");
	}
	get states() {
		return this.form.get("state");
	}
	get country() {
		return this.form.get("country");
	}
	get phone() {
		return this.form.get("phone");
	}
	get email() {
		return this.form.get("email");
	}
	get category() {
		return this.form.get("category");
	}
}
