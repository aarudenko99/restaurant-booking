// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable, defer, of, forkJoin } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
// CRUD
import { QueryResultsModel, QueryParamsModel } from '../../_base/crud';
// Services
import { AuthService } from '../../../core/auth/_services';
// State
import { AppState } from '../../../core/reducers';
import {
	UserActionTypes,
	UsersPageRequested,
	UsersPageLoaded,
	UserCreated,
	UserDeleted,
	UserUpdated,
	UserOnServerCreated,
	UsersActionToggleLoading,
	UsersPageToggleLoading
} from '../_actions/user.actions';

@Injectable()
export class UserEffects {
	showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
	hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

	showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
	hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });

	@Effect()
	loadUsersPage$ = this.actions$.pipe(
		ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
		mergeMap(({ payload }) => {
			this.store.dispatch(this.showPageLoadingDistpatcher);
			// const requestToServer = this.auth.findUsers(payload.page);
			let SelectedRestaurantId;

			if (localStorage.getItem('SelectedRestaurantId') !== 'undefined') {
				SelectedRestaurantId = JSON.parse(localStorage.getItem('SelectedRestaurantId'));
			}
			const id = this.auth.selectedRestaurantId.value ? this.auth.selectedRestaurantId.value : SelectedRestaurantId;
			console.log(id, this.auth.selectedRestaurantId.value);
			const requestToServer = this.auth.findUsers(id, payload.page);
			const lastQuery = of(payload.page);
			return forkJoin(requestToServer, lastQuery);
		}),
		map(response => {
			const result: QueryResultsModel = response[0];
			const lastQuery: QueryParamsModel = response[1];
			return new UsersPageLoaded({
				users: result.data,
				totalCount: result.totalCount,
				page: lastQuery
			});
		})
	);

	@Effect()
	deleteUser$ = this.actions$.pipe(
		ofType<UserDeleted>(UserActionTypes.UserDeleted),
		mergeMap(({ payload }) => {
			this.store.dispatch(this.showActionLoadingDistpatcher);
			return this.auth.deleteUser(payload._id);
		}),
		map(res => {
			return this.hideActionLoadingDistpatcher;
		})
	);

	@Effect()
	updateUser$ = this.actions$.pipe(
		ofType<UserUpdated>(UserActionTypes.UserUpdated),
		mergeMap(({ payload }) => {
			this.store.dispatch(this.showActionLoadingDistpatcher);
			console.log(payload);
			return this.auth.updateUser(payload.user);
		}),
		map(res => {
			return this.hideActionLoadingDistpatcher;
		})
	);

	@Effect()
	createUser$ = this.actions$.pipe(
		ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
		mergeMap(({ payload }) => {
			this.store.dispatch(this.showActionLoadingDistpatcher);
			return this.auth.createUser(payload.user).pipe(
				tap(res => {
					this.store.dispatch(new UserCreated({ user: res }));
				})
			);
		}),
		map(() => {
			return this.hideActionLoadingDistpatcher;
		})
	);

	constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) {}
}
