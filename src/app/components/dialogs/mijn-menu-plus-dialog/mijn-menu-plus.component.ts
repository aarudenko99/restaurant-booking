import {
	Component,
	Inject,
	OnInit,
	Optional,
	ViewChild,
	ChangeDetectorRef
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ValidatorService } from "angular-iban";
import { AuthService } from "../../../core/auth";
import { MollieService } from "../../../services/mollie.service";
import { Mandate } from "../../../common/models/mollie/mandate";
import { MollieSubscription } from "../../../common/models/mollie/molliesubscription";

@Component({
	selector: "mm-mijn-menu-plus",
	templateUrl: "./mijn-menu-plus.component.html",
	styleUrls: ["./mijn-menu-plus.component.scss"]
})
export class MijnMenuPlusComponent implements OnInit {
	@ViewChild("stepper", { static: true }) stepper: MatStepper;
	isLinear: boolean = true;
	menuItemForm: FormGroup;
	termsAccepted: boolean = false;
	submitted: boolean;

	constructor(
		public dialogRef: MatDialogRef<MijnMenuPlusComponent>,
		private fb: FormBuilder,
		private mollieService: MollieService,
		private auth: AuthService,
		private cd: ChangeDetectorRef,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.menuItemForm = this.fb.group({
			Name: [null, Validators.required],
			Iban: [null, [Validators.required, ValidatorService.validateIban]]
		});
	}

	ngAfterContentInit() {
		if (this.data) {
			this.stepper.selectedIndex = 2;
			this.termsAccepted = true;
			this.isLinear = false;
			this.cd.detectChanges();
		}
	}

	goBack(stepper: MatStepper) {
		stepper.previous();
	}

	goForward(stepper: MatStepper) {
		stepper.next();
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.menuItemForm.controls;
	}

	confirm(stepper: MatStepper) {
		this.submitted = true;

		// stop here if form is invalid
		if (this.menuItemForm.invalid) {
			return;
		}

		const mandate: Mandate = new Mandate();
		mandate.RestaurantId = this.auth.getRestaurantId();
		mandate.Method = "directdebit";
		mandate.ConsumerName = this.menuItemForm.controls.Name.value;
		mandate.ConsumerAccount = this.menuItemForm.controls.Iban.value;

		this.mollieService
			.createMollieMandate(mandate)
			.subscribe(mandateResp => {
				if (mandateResp) {
					const mollieSubscription: MollieSubscription = new MollieSubscription();
					mollieSubscription.RestaurantId = this.auth.getRestaurantId();
					mollieSubscription.MandateId = mandateResp.data.id;
					mollieSubscription.Currency = "EUR";
					mollieSubscription.Amount = "100.00";
					this.mollieService
						.activateSubscription(mollieSubscription)
						.subscribe(subscriptionResp => {
							if (subscriptionResp) {
								console.log(
									"SUCCESSFULLY SUBSCRIBED",
									subscriptionResp
								);

								this.dialogRef.close(subscriptionResp);
							}
						});
				}
			});
	}
}
