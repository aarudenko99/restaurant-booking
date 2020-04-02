// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';

@Component({
    selector: 'mm-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    // Public params
    resetPasswordForm: FormGroup;
    loading = false;
    errors: any = [];

    private userId: string;
    private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    /**
     * Component constructor
     *
     * @param authService
     * @param authNoticeService
     * @param translate
     * @param router
     * @param fb
     * @param cdr
     */
    constructor(
        private authService: AuthService,
        public authNoticeService: AuthNoticeService,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this.unsubscribe = new Subject();
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
        this.initRegistrationForm();
        this.userId = this.route.snapshot.paramMap.get('id');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initRegistrationForm() {
        this.resetPasswordForm = this.fb.group({
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ])],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ])]
        });
    }

    /**
     * Form Submit
     */
    submit() {
        const controls = this.resetPasswordForm.controls;
        /** check form */
        if (this.resetPasswordForm.invalid || !this.userId) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;
        const resetPassword = {
            _id: this.userId,
            newPassword: controls['password'].value,
            newPasswordConfirm: controls['confirmPassword'].value,
        };

        this.authService.resetPassword(resetPassword).pipe(
            tap(response => {
                if (response) {
                    this.authNoticeService.setNotice(this.translate.instant('AUTH.RESET.SUCCESS'), 'success');
                    // this.router.navigateByUrl('/auth/login');
                } else {
                    this.authNoticeService.setNotice(
                        this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'danger');
                }
            }),
            takeUntil(this.unsubscribe),
            finalize(() => {
                this.loading = false;
                this.cdr.markForCheck();
            })
        ).subscribe();
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.resetPasswordForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }
}
