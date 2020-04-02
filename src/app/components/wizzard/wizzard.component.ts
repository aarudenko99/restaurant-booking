import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	Input,
	SimpleChanges
} from "@angular/core";
import { WizardService } from "../../services/wizard.service";
import { Alert } from "../../common/models/alert";
import { RestaurantSetupComponent } from "../../components/wizzard/restaurant-setup/restaurant-setup.component";
import { RestaurantDetailsComponent } from "../../components/wizzard/restaurant-details/restaurant-details.component";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { MatDialog } from "@angular/material";
import { SetupLocationComponent } from "../dialogs/setup-location/setup-location.component";
import { RestaurantService } from "../../services/restaurant.service";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth";

@Component({
	selector: "mm-wizzard",
	templateUrl: "./wizzard.component.html",
	styleUrls: ["./wizzard.component.scss"]
})
export class WizzardComponent implements OnInit, AfterViewInit {
	@Input() restaurant;

	@ViewChild("wizardSwal", { static: true })
	private wizardSwal: SwalComponent;
	@ViewChild("wizard", { static: true })
	el: ElementRef;
	@ViewChild("setup", { static: true })
	setup: RestaurantSetupComponent;
	@ViewChild("details", { static: true })
	details: RestaurantDetailsComponent;

	swal: any = {};
	alert: Alert = new Alert();
	loading: boolean;
	index: number;
	validateTime: boolean;
	currentStep: number;

	submitted = false;
	wizards;

	constructor(
		private route: Router,
		private auth: AuthService,
		public dialog: MatDialog,
		public wizardService: WizardService,
		public restaurantService: RestaurantService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.restaurant.currentValue) {
			this.wizardService.formData = changes.restaurant.currentValue;
		}
	}

	ngOnInit() {
		console.log(this.restaurant);
	}

	ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});
		this.wizards = wizard;
		this.currentStep = wizard.currentStep;

		// Validation before going to next page
		// wizard.on('beforeNext', (wizardObj) => {
		//     // https://angular.io/guide/forms
		//     // https://angular.io/guide/form-validation

		//     if (!this.wizardService) {
		//         wizardObj.stop();
		//     }
		//     // console.log(this.wizardService, 'STEPPPPPPPP', wizardObj.currentStep);
		//     // validate the form and use below function to stop the wizard's step
		//     // wizardObj.stop();
		//     this.currentStep = wizardObj.currentStep;
		// });

		// Change event
		wizard.on("change", () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

	nextStep() {
		switch (this.wizards.getStep()) {
			case 1:
				this.wizardService.type = "setup";
				this.wizardService.submit(this.setup.form);

				if (
					!this.wizardService.formData.Lat &&
					!this.wizardService.formData.Long
				) {
					this.swal.type = "info";
					this.swal.title = "Try to select from google predictions.";
					this.swal.text = `Try to select your restaurant from the google predictions in the restaurant name field.
                                    So we can automatically set up your location.
                                    If your restaurant is not in the list then fill out the form without selecting it.`;
					setTimeout(() => {
						this.wizardSwal.fire();
					}, 100);
					this.wizardService.form.setErrors({ invalid: true });
					this.geoCodeAddress();
				}
				break;
			case 2:
				// this.wizardService.RestaurantSetup = this.wizardService.formData;
				this.wizardService.type = "details";
				// this.validateTime = true;
				this.wizardService.submit(this.details.form);
				this.wizardService.formData.OpeningHours = this.details.days;
				break;
			default:
				break;
		}

		console.log(this.wizardService.formData);

		if (
			this.wizardService.editRestaurant.value &&
			this.wizardService.form.controls["category"] &&
			this.wizardService.formData.RestaurantCategoryId
		) {
			this.wizardService.form.get("category").setErrors(null);
		}
		if (this.wizardService.form.invalid) {
			this.loading = false;
			this.alert.type = "warn";
			this.alert.message = "Oh snap! Something went wrong.";
			this.alert.showAlert = true;
			return;
		} else if (this.wizardService.form.valid) {
			this.wizardService.formData.TimeSlots = [];
			if (this.wizardService.type !== "details") {
				this.currentStep++;
				this.wizards.goNext();
			}
			if (this.wizardService.type === "details") {
				let nextStep = true;
				this.details.days.forEach(element => {
					if (!element.validate) {
						nextStep = false;
					}
				});
				const timeslotObject: any = {};
				this.details.timeSlotArray.forEach(element => {
					timeslotObject[element.type] = element.timeslot;
					if (!element.validate) {
						nextStep = false;
					}
				});
				this.wizardService.formData.TimeSlots.push(timeslotObject);
				setTimeout(() => {
					this.details.touchTimeZone = true;
				}, 300);
				if (
					!this.details.touchTimeZone &&
					!this.wizardService.editRestaurant.value
				) {
					this.swal.type = "info";
					this.swal.title =
						"Try to select openinghours and timeslots";
					this.swal.text = `We noticed you didn't change the openinghours and timeslots please check and confirm.`;
					setTimeout(() => {
						this.wizardSwal.fire();
					}, 100);
				} else {
					this.currentStep++;
					this.wizards.goNext();
				}
			}
		}
	}

	geoCodeAddress() {
		const geocoder = new google.maps.Geocoder();
		console.log(this.wizardService.form.controls);
		const address = this.wizardService.form.controls.address.value;
		geocoder.geocode({ address: address }, (results, status) => {
			if (status === "OK") {
				console.log(results[0].geometry.location);
				this.wizardService.formData.Lat = results[0].geometry.location.lat();
				this.wizardService.formData.Long = results[0].geometry.location.lng();
				console.log(this.wizardService);
			} else {
				alert(
					"Geocode was not successful for the following reason: " +
						status
				);
			}
		});
	}

	confirmSwal(swal?) {
		this.wizardService.form.setErrors(null);
		this.alert = new Alert();
		if (swal.redirect) {
			this.route.navigate([swal.redirect]);
		}
	}

	// setupLocation(event): void {
	//     console.log(event);
	//     const dialogRef = this.dialog.open(SetupLocationComponent, {
	//         width: '40%',
	//         panelClass: 'kt-portlet-dialog',
	//     });

	//     dialogRef.afterClosed().subscribe(result => {
	//         this.wizardService.form.setErrors({invalid : false});
	//     });
	// }

	updateRestaurant() {
		this.swal.type = "success";
		this.swal.redirect =
			"/dashboard/view-restaurant/" + this.wizardService.formData._id;
		this.swal.title = "Restaurant updated Successfully";
		this.swal.text = `Restaurant ${this.wizardService.formData.Name} is successfully updated.`;

		this.restaurantService
			.update(this.wizardService.formData)
			.subscribe(data => {
				setTimeout(() => {
					this.wizardSwal.fire();
				}, 100);
			});
	}

	onSubmit() {
		this.submitted = true;
		this.swal.type = "success";
		this.swal.title = "Restaurant created Successfully";
		this.swal.text = `Restaurant ${this.wizardService.formData.Name} is successfully created.`;
		// this.wizardService.formData.UserId = this.auth.getUserId();
		this.restaurantService
			.add(this.wizardService.formData)
			.subscribe(data => {
				this.swal.redirect =
					"/dashboard/view-restaurant/" + data.data._id;

				this.addRestaurant(data.data);
				this.auth
					.updateSetupProgress({
						UserId: this.auth.getUserId()
					})
					.subscribe();
				setTimeout(() => {
					this.wizardSwal.fire();
				}, 100);
			});
	}

	addRestaurant(data: any) {
		const restaurants = this.restaurantService.restaurants.value;
		const addedRestaurant = { Restaurant: this.wizardService.formData };
		restaurants.push(addedRestaurant);
		this.restaurantService.restaurants.next(restaurants);

		this.auth.selectedRestaurantId.next(data._id);
		this.auth.selectedRestaurantName.next(data.Name);
		this.auth.selectedRestaurant.next(data.data);
		localStorage.setItem("SelectedRestaurantId", JSON.stringify(data._id));
		localStorage.setItem(
			"SelectedRestaurant",
			JSON.stringify({ Restaurant: data })
		);
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.alert.showAlert = false;
	}
}
