// Angular
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// RxJS
import { Observable } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
// AppState
import { AppState } from "../../../core/reducers";
// Auth
import { AuthService } from "../../../core/auth";

const userManagementPermissionId: number = 2;
@Component({
	selector: "kt-user-management",
	templateUrl: "./user-management.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit {
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param router: Router
	 */
	constructor(private auth: AuthService, private route: ActivatedRoute) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {}

	ngAfterViewInit(): void {
		this.route.paramMap.subscribe(params => {
			const id = params.get("id");
			this.auth.selectedRestaurantId.next(id);

			console.log(id, "ID CHANGEDD");
		});
	}
}
