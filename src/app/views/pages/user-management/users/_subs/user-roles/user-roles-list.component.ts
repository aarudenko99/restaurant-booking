// Angular
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// RxJS
import { BehaviorSubject, Observable } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
// Lodash
import { each, find, remove } from "lodash";
// State
import { AppState } from "../../../../../../core/reducers";
// Auth
import { Role, selectAllRoles, AuthService } from "../../../../../../core/auth";

@Component({
	selector: "kt-user-roles-list",
	templateUrl: "./user-roles-list.component.html"
})
export class UserRolesListComponent implements OnInit {
	// Public properties
	// Incoming data
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() rolesSubject: BehaviorSubject<any>;

	@Output() rolesAction: EventEmitter<any> = new EventEmitter();

	// Roles
	allUserRoles$: Observable<Role[]>;
	allRoles: Role[] = [];
	unassignedRoles: Role[] = [];
	assignedRoles: Role[] = [];
	roleIdForAdding: number;

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
	ngOnInit() {
		this.auth.getAllRoles().subscribe((roles: any) => {
			// this.allUserRoles$ = roles;
			each(roles, (_role: Role) => {
				console.log("GET ALL ROLES!!!!!!!!!", _role);

				if (_role.id) {
					this.allRoles.push(_role);
					this.unassignedRoles.push(_role);
				}
			});

			each(this.rolesSubject.value, (roleId: number) => {
				const role = find(this.allRoles, (_role: Role) => {
					return _role.id === roleId;
				});

				if (role) {
					this.assignedRoles.push(role);
					remove(this.unassignedRoles, role);
				}
			});
		});
	}

	/**
	 * Assign role
	 */
	assignRole() {
		if (this.roleIdForAdding === 0) {
			return;
		}

		const role = find(this.allRoles, (_role: Role) => {
			return _role.id === +this.roleIdForAdding;
		});
		if (role) {
			this.assignedRoles.push(role);
			remove(this.unassignedRoles, role);
			this.roleIdForAdding = 0;
			this.updateRoles();
		}
	}

	/**
	 * Unassign role
	 *
	 * @param role: Role
	 */
	unassingRole(role: Role) {
		this.roleIdForAdding = 0;
		this.unassignedRoles.push(role);
		remove(this.assignedRoles, role);
		this.updateRoles();
	}

	/**
	 * Update roles
	 */
	updateRoles() {
		const _roles = [];
		let title = "";
		each(this.assignedRoles, elem => {
			(title = elem.title), _roles.push(elem.id);
		});
		this.rolesSubject.next({ title, roles: _roles });
		this.rolesAction.emit(null);
		console.log(this.rolesSubject.value);
	}
}
