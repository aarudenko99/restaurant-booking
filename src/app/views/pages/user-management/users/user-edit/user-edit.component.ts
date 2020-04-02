// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import {
    SubheaderService,
    LayoutConfigService
} from '../../../../../core/_base/layout';
import {
    LayoutUtilsService,
    MessageType
} from '../../../../../core/_base/crud';
// Services and Models
import {
    User,
    UserUpdated,
    Address,
    SocialNetworks,
    selectHasUsersInStore,
    selectUserById,
    UserOnServerCreated,
    selectLastCreatedUserId,
    selectUsersActionLoading,
    AuthService
} from '../../../../../core/auth';

@Component({
    selector: 'kt-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy {
    @ViewChild('personalInfo', { static: false }) personalInfo: any;
    // Public properties
    user: User;
    userId$: Observable<number>;
    oldUser: User;
    selectedTab = 0;
    loading$: Observable<boolean>;
    userSubject = new BehaviorSubject<User>(new User());
    rolesSubject = new BehaviorSubject<any>({});
    addressSubject = new BehaviorSubject<Address>(new Address());
    userForm: FormGroup;
    hasFormErrors = false;
    userFormValid = false;
    formValid = false;

    // Private properties
    private subscriptions: Subscription[] = [];

    /**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userFB: FormBuilder,
        private subheaderService: SubheaderService,
        private layoutUtilsService: LayoutUtilsService,
        private store: Store<AppState>,
        private layoutConfigService: LayoutConfigService,
        private authService: AuthService
    ) {}

    /**
	 * On init
	 */
    ngOnInit() {
        this.loading$ = this.store.pipe(select(selectUsersActionLoading));

        const routeSubscription = this.activatedRoute.params.subscribe(
            params => {
                const id = params.id;
                if (id && id > 0) {
                    this.store
                        .pipe(select(selectUserById(id)))
                        .subscribe(res => {
                            if (res) {
                                this.user = res;
                                this.rolesSubject.next(this.user.Roles);
                                this.addressSubject.next(this.user.Address);
                                this.oldUser = Object.assign({}, this.user);
                                this.initUser();
                                this.basicFormValid();
                            }
                        });
                } else {
                    this.user = new User();
                    this.user.clear();
                    this.rolesSubject.next(this.user.Roles);
                    this.addressSubject.next(this.user.Address);
                    this.oldUser = Object.assign({}, this.user);
                    this.initUser();
                    this.basicFormValid();
                }
            }
        );
        this.subscriptions.push(routeSubscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    public get addressValue(): Address {
        if (this.addressSubject) { return this.addressSubject.value; } else {
            return null;
        }
    }

    /**
	 * Init user
	 */
    initUser() {
        // this.createForm();
        this.userSubject.next(this.user);
        if (!this.user.id) {
            this.subheaderService.setTitle('Create user');
            this.subheaderService.setBreadcrumbs([
                { title: 'User Management', page: `user-management` },
                { title: 'Users', page: `user-management/users` },
                { title: 'Create user', page: `user-management/users/add` }
            ]);
            return;
        }
        this.subheaderService.setTitle('Edit user');
        this.subheaderService.setBreadcrumbs([
            { title: 'User Management', page: `user-management` },
            { title: 'Users', page: `user-management/users` },
            {
                title: 'Edit user',
                page: `user-management/users/edit`,
                queryParams: { id: this.user.id }
            }
        ]);
    }

    /**
	 * Redirect to list
	 *
	 */
    goBackWithId() {
        const url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users`;
        this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
    }

    /**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
    refreshUser(isNew: boolean = false, id = 0) {
        let url = this.router.url;
        console.log('URL1', url, isNew);

        if (!isNew) {
            // this.router.navigate([url], { relativeTo: this.activatedRoute });
            return;
        }

        url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users/edit/${id}`;
        console.log('URL2', url);
        // this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
    }

    /**
	 * Reset
	 */
    reset() {
        this.personalInfo.createForm(this.oldUser);
        this.hasFormErrors = false;
        this.personalInfo.userForm.markAsPristine();
        this.personalInfo.userForm.markAsUntouched();
        this.personalInfo.userForm.updateValueAndValidity();
    }

    /**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
    onSumbit(withBack: boolean = false) {
        if (this.personalInfo) {
            this.personalInfo.onSubmit(withBack);

            if (this.personalInfo.hasFormErrors) {
                this.selectedTab = 0;
            }
        }

        // console.log(this.rolesSubject.value, (this.userSubject.value.Role = 'TEST'));

        let editedUser = new User();
        editedUser.clear();
        editedUser = this.userSubject.value as User;
        let roles = this.rolesSubject.value.roles;
        if (typeof this.rolesSubject.value.roles === 'undefined') {
            roles = this.rolesSubject.value;
        }

        editedUser = Object.assign({}, editedUser, {
            isStaff: true,
            Role: this.rolesSubject.value.title
                ? this.rolesSubject.value.title
                : '',
            Roles: roles
        });
        if (editedUser.hasFormError) {
            return;
        }

        if (editedUser.id > 0) {
            this.updateUser(editedUser, withBack);
            return;
        }

        this.addUser(editedUser, withBack);
    }

    /**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
    addUser(_user: User, withBack: boolean = false) {
        this.store.dispatch(new UserOnServerCreated({ user: _user }));
        const addSubscription = this.store
            .pipe(select(selectLastCreatedUserId))
            .subscribe(newId => {
                const message = `New user has been successfully added.`;
                this.layoutUtilsService.showActionNotification(
                    message,
                    MessageType.Create,
                    5000,
                    true,
                    true
                );
                // TO DO CHECK NEW ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (newId) {
                    if (withBack) {
                        this.goBackWithId();
                    } else {
                        this.refreshUser(true, _user.id);
                    }
                }
            });
        this.subscriptions.push(addSubscription);
    }

    /**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
    updateUser(_user: User, withBack: boolean = false) {
        // Update User
        // tslint:disable-next-line:prefer-const
        const updatedUser: Update<User> = {
            id: _user.id,
            changes: _user
        };
        this.store.dispatch(
            new UserUpdated({ partialUser: updatedUser, user: _user })
        );
        console.log(_user);

        const message = `User successfully has been saved.`;
        this.layoutUtilsService.showActionNotification(
            message,
            MessageType.Update,
            5000,
            true,
            true
        );
        if (withBack) {
            this.goBackWithId();
        } else {
            this.refreshUser(false);
        }
    }

    /**
	 * Returns component title
	 */
    getComponentTitle() {
        let result = 'Create user';
        if (!this.user || !this.user.id) {
            return result;
        }

        result = `Edit user - ${this.user.FullName}`;
        return result;
    }

    /**
	 *
	 * @param $event: Event
	 */

    basicFormValid($event?) {
        let rolesValid = false;

        if (typeof this.rolesSubject.value.roles !== 'undefined') {
            if (this.rolesSubject.value.roles.length > 0) { rolesValid = true; }
        } else if (this.rolesSubject.value.length > 0) { rolesValid = true; }

        this.formValid = rolesValid;
    }

    /**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
    onAlertClose($event) {
        this.hasFormErrors = false;
    }
}
