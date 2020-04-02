import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../core/auth";
import { TranslateService } from "@ngx-translate/core";
import { Alert } from "../../../common/models/alert";

@Component({
	selector: "mm-change-password",
	templateUrl: "./change-password.component.html",
	styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
	// Public params
	changePasswordForm: FormGroup;
	loading = false;
	alert: Alert = new Alert();

	constructor(
		private authService: AuthService,
		private translate: TranslateService,
		private cd: ChangeDetectorRef,
		private fb: FormBuilder
	) {}

	/**
	 * On init
	 */
	ngOnInit() {
		this.alert ? (this.alert.showAlert = false) : null;
		this.initRegistrationForm();
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegistrationForm() {
		this.changePasswordForm = this.fb.group({
			oldPassword: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				])
			],
			newPassword: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				])
			],
			newPasswordConfirm: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		console.log("SUBMIT");
		const controls = this.changePasswordForm.controls;
		console.log("SUBMIT2", controls);
		/** check form */
		if (this.changePasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		const changePassword = {
			_id: this.authService.getUserId(),
			oldPassword: controls["oldPassword"].value,
			newPassword: controls["newPassword"].value,
			newPasswordConfirm: controls["newPasswordConfirm"].value
		};
		console.log(changePassword);

		if (changePassword.newPassword !== changePassword.newPasswordConfirm) {
			this.loading = false;
			this.alert.type = "warn";
			this.alert.message = "Oh snap! The new passwords did not match.";
			this.alert.showAlert = true;
			return;
		}

		this.authService.changePassword(changePassword).subscribe(
			response => {
				this.loading = false;
				this.alert.type = "success";
				this.alert.message = response.message;
				this.alert.showAlert = true;
				console.log("THIS IS THE RESPONSE", response);
				this.cd.detectChanges();
			},
			error => {
				this.loading = false;
				this.alert.type = "warn";
				this.alert.message = "Oh snap! " + error;
				this.alert.showAlert = true;
				this.cd.detectChanges();
			}
		);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.changePasswordForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
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
