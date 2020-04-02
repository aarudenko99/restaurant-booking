// Angular
import { Injectable } from "@angular/core";
// RxJS
import { of, Observable, defer, forkJoin } from "rxjs";
import { mergeMap, map, withLatestFrom, filter, tap } from "rxjs/operators";
// NGRX
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store, select, Action } from "@ngrx/store";
// Services
import { AuthService } from "../_services";
// State
import { AppState } from "../../../core/reducers";
// Selectors
import { allRolesLoaded } from "../_selectors/role.selectors";
// Actions
import {
	AllRolesLoaded,
	AllRolesRequested,
	RoleActionTypes,
	RolesPageToggleLoading,
	RolesActionToggleLoading
} from "../_actions/role.actions";

@Injectable()
export class RoleEffects {
	showPageLoadingDistpatcher = new RolesPageToggleLoading({
		isLoading: true
	});
	hidePageLoadingDistpatcher = new RolesPageToggleLoading({
		isLoading: false
	});

	showActionLoadingDistpatcher = new RolesActionToggleLoading({
		isLoading: true
	});
	hideActionLoadingDistpatcher = new RolesActionToggleLoading({
		isLoading: false
	});

	@Effect()
	loadlAllRoles$ = this.actions$.pipe(
		ofType<AllRolesRequested>(RoleActionTypes.AllRolesRequested),
		withLatestFrom(this.store.pipe(select(allRolesLoaded))),
		filter(([action, isAllRolesLoaded]) => !isAllRolesLoaded),
		mergeMap(() => this.auth.getAllRoles()),
		map(roles => {
			return new AllRolesLoaded({ roles });
		})
	);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of(new AllRolesRequested());
	});

	constructor(
		private actions$: Actions,
		private auth: AuthService,
		private store: Store<AppState>
	) {}
}
