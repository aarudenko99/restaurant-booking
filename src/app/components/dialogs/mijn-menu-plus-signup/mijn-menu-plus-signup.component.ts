import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "mm-mijn-menu-plus-signup",
	templateUrl: "./mijn-menu-plus-signup.component.html",
	styleUrls: ["./mijn-menu-plus-signup.component.scss"]
})
export class MijnMenuPlusSignupComponent implements OnInit {
	PhoneNumber: any;

	signUpForm: FormGroup;
	submitted: boolean;
	termsAccepted: boolean = false;
	Options: any = [
		"Van horen zeggen(vrienden, familie)",
		"Via google gevonden",
		"Via facebook"
	];

	constructor(
		public dialogRef: MatDialogRef<MijnMenuPlusSignupComponent>,
		private fb: FormBuilder,
		private auth: AuthService,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.signUpForm = this.fb.group({
			Name: [null, Validators.required],
			Email: [
				null,
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			],
			PhoneNumber: [null, Validators.required],
			Company: [null, Validators.required],
			AmountOfSeats: [null, Validators.required],
			CurrPosSystem: [null, Validators.required],
			SearchCriteria: [this.Options[0], Validators.required]
		});
	}

	changeSearchCriteria(e) {
		this.signUpForm.controls["SearchCriteria"].setValue(e.target.value, {
			onlySelf: true
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.signUpForm.controls;
	}

	confirm() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.signUpForm.invalid) {
			return;
		}

		this.auth
			.postMijnMenuPlusSignUp(this.signUpForm.value)
			.subscribe(response => {
				if (response && response.status === 200) {
					this.dialogRef.close(response);
				}
			});
	}
}
