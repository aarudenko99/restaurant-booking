// Angular
import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from "@angular/router";
// RxJS
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// NGRX
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material";
// Auth reducers and selectors
import { AppState } from "../../../core/reducers/";
import { isLoggedIn } from "../_selectors/auth.selectors";
import { LayoutConfig } from "../../_config/config/layout.config";
import { AuthService } from "../_services";
import { AvgDialogComponent } from "../../../components/dialogs/avg-dialog/avg-dialog.component";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private store: Store<AppState>,
		private router: Router,
		private auth: AuthService,
		private dialog: MatDialog
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		const config = new LayoutConfig();
		if (!this.auth.currentUserValue["data"].avgAccepted) {
			console.log("SHOW AVG");

			const dialogRef = this.dialog.open(AvgDialogComponent, {
				width: "50%",
				disableClose: true,
				data: {}
			});
		}
		localStorage.setItem("layoutConfig", JSON.stringify(config.defaults));
		return this.store.pipe(
			select(isLoggedIn),
			tap(loggedIn => {
				if (!loggedIn) {
					this.router.navigateByUrl("/auth/login");
				}
			})
		);
	}
}
