// Angular
import { Component, Input, OnInit } from "@angular/core";
// RxJS
import { Observable } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
// State
import { AppState } from "../../../../../core/reducers";
import { Logout, AuthService } from "../../../../../core/auth";

@Component({
	selector: "kt-user-profile",
	templateUrl: "./user-profile.component.html"
})
export class UserProfileComponent implements OnInit {
	// Public properties
	public user;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>, private auth: AuthService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = this.auth.getCurrentUser();
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}
}
