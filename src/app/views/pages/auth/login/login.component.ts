// Angular
import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
	Injector
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { Observable, Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
// Translate
import { TranslateService } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../../core/reducers";
// Auth
import { AuthNoticeService, AuthService, Login } from "../../../../core/auth";
import { NotificationService } from "../../../../services/notification.service";
import { RestaurantService } from "../../../../services/restaurant.service";
import { AbstractController } from "../../../../controllers/abstract/abstract.controller";

const DEMO_PARAMS = {
	EMAIL: "admin1@gmail.com",
	PASSWORD: "admin1"
};

@Component({
	selector: "kt-login",
	templateUrl: "./login.component.html",
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends AbstractController
	implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	constructor(
		injector: Injector,
		private router: Router,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private notificationService: NotificationService
	) {
		super(injector);
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params["returnUrl"] || "/dashboard/home";
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
            <strong>${DEMO_PARAMS.EMAIL}</strong> and password
            <strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, "info");
		}

		this.loginForm = this.fb.group({
			email: [
				DEMO_PARAMS.EMAIL,
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				])
			],
			password: [
				DEMO_PARAMS.PASSWORD,
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		const authData = {
			email: controls["email"].value,
			password: controls["password"].value
		};

		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(response => {
					if (response && response.data.EmailVerified) {
						this.store.dispatch(
							new Login({ authToken: response.token })
						);

						this.notificationService.connect();
						this.loadRestaurants();

						this.router.navigateByUrl(this.returnUrl); // Main page
					} else if (!response.data.EmailVerified) {
						this.authNoticeService.setNotice(
							response.message,
							"danger"
						);
					} else {
						this.authNoticeService.setNotice(
							this.translate.instant(
								"AUTH.VALIDATION.INVALID_LOGIN"
							),
							"danger"
						);
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
