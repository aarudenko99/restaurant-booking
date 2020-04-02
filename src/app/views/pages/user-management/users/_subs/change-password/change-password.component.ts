// Angular
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	ChangeDetectorRef
} from "@angular/core";
import { AbstractControl, Validators, FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
// RxJS
import { BehaviorSubject } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";
// Auth
import { AuthService, UserUpdated, User } from "../../../../../../core/auth/";
// State
import { AppState } from "../../../../../../core/reducers";
// Layout
import {
	LayoutUtilsService,
	MessageType
} from "../../../../../../core/_base/crud";
import { Alert } from "../../../../../../common/models/alert";

export class PasswordValidation {
	/**
	 * MatchPassword
	 *
	 * @param AC: AbstractControl
	 */
	static MatchPassword(AC: AbstractControl) {
		const password = AC.get("password").value; // to get value in input tag
		const confirmPassword = AC.get("confirmPassword").value; // to get value in input tag
		if (password !== confirmPassword) {
			AC.get("confirmPassword").setErrors({ MatchPassword: true });
		} else {
			return null;
		}
	}
}

@Component({
	selector: "kt-change-password",
	templateUrl: "./change-password.component.html"
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
	// Public properties
	@Input() userId: string;
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	hasFormErrors: boolean = false;
	alert: Alert = new Alert();
	user: User;
	changePasswordForm: FormGroup;

	/**
	 * Component constructor
	 *
	 * @param fb: FormBuilder
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param layoutUtilsService: LayoutUtilsService
	 */
	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private store: Store<AppState>,
		private cd: ChangeDetectorRef,
		// tslint:disable-next-line:align
		private layoutUtilsService: LayoutUtilsService
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.loadData();
	}

	/**
	 * Load data
	 */
	loadData() {
		this.auth.getUserById(this.userId).subscribe(res => {
			this.user = res;
			this.createForm();
		});
	}

	/**
	 * Init form
	 */
	createForm() {
		this.changePasswordForm = this.fb.group({
			oldPassword: ["", Validators.required],
			newPassword: ["", Validators.required],
			newPasswordConfirm: ["", Validators.required]
		});
	}

	/**
	 * Reset
	 */
	// reset() {
	// 	this.hasFormErrors = false;
	// 	this.loadingSubject.next(false);
	// 	this.changePasswordForm.markAsPristine();
	// 	this.changePasswordForm.markAsUntouched();
	// 	this.changePasswordForm.updateValueAndValidity();
	// }

	/**
	 * Save data
	 */
	onSubmit() {
		this.loadingSubject.next(true);
		this.hasFormErrors = false;
		const controls = this.changePasswordForm.controls;
		/** check form */
		if (this.changePasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			this.loadingSubject.next(false);

			return;
		}

		const changePassword = {
			_id: this.user["data"]._id,
			oldPassword: controls["oldPassword"].value,
			newPassword: controls["newPassword"].value,
			newPasswordConfirm: controls["newPasswordConfirm"].value
		};

		if (changePassword.newPassword !== changePassword.newPasswordConfirm) {
			this.alert.type = "warn";
			this.alert.message = "Oh snap! The new passwords did not match.";
			this.alert.showAlert = true;
			return;
		}

		this.auth.changePassword(changePassword).subscribe(
			response => {
				this.loadData();
				this.loadingSubject.next(false);
				const message = `User password has been successfully changed.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Update,
					5000,
					true,
					false
				);
			},
			error => {
				this.alert.type = "warn";
				this.alert.message = "Oh snap! " + error;
				this.alert.showAlert = true;
				this.cd.detectChanges();
			}
		);
	}

	/**
	 * Close alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
		this.alert.showAlert = false;
	}
}
