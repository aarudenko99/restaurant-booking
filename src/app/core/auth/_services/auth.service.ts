import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { User } from "../_models/user.model";
import { Role } from "../_models/role.model";
import { catchError, map } from "rxjs/operators";
import { QueryParamsModel, QueryResultsModel } from "../../_base/crud";
import { AppSettings } from "../../../app.settings";
import { GlobalService } from "../../../services/global.service";
import { AbstractService } from "../../../services/abstract.service";
import { Restaurant } from "../../../common/models/restaurant";

const API_STAFF_URL = "api/staff";
const API_ROLES_URL = "api/roles";

@Injectable()
export class AuthService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;
	public currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	public selectedRestaurantId = new BehaviorSubject<string>("");
	public selectedRestaurantName = new BehaviorSubject<string>("");
	public selectedRestaurant = new BehaviorSubject<Restaurant>(
		new Restaurant()
	);

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
		this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem("currentUser"))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	// Authentication/Authorization
	login(email: string, password: string): Observable<any> {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		const body = { EmailAddress: email, Password: password };

		return this.http
			.post(this.apiURL + "/api/user/login", body, { headers })
			.pipe(
				map((response: any) => {
					if (response && response.data.EmailVerified) {
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem(
							"currentUser",
							JSON.stringify(response)
						);
						this.currentUserSubject.next(response);
					}
					return response;
				})
			);
	}

	/*
	 * GET Setup Progress
	 *
	 * @param {_id: id, Restaurant: boolean, Menu: boolean} user obj
	 * @returns {Observable<any>}
	 */
	getSetupProgress(params: HttpParams) {
		return this.http
			.get(this.apiURL + "/api/accSetupProgress", {
				headers: this.getHeaders(),
				params: params
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Update Setup Progress
	 *
	 * @param {RestaurantId?: id, UserId?: boolean, SetupProgress: boolean} user obj
	 * @returns {Observable<any>}
	 */
	updateSetupProgress(setupProgress: object): Observable<any> {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		return this.http
			.put(this.apiURL + "/api/accSetupProgress", setupProgress, {
				headers: headers
			})
			.pipe(map((response: any) => response));
	}
	/*
	 * POST Sign up Form
	 *
	 * @param { formData: formInputData } Name, Email, Phone, Company, Amount Of Seats, Current   * POS System, Search Criteria
	 * @returns {Observable<any>}
	 */
	postMijnMenuPlusSignUp(body: object) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this.http
			.post(this.apiURL + "/api/sendMijnMenuPlusEmail", body, { headers })
			.pipe(
				map((response: any) => {
					if (response) {
						console.log(response);
					}
					return response;
				})
			);
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("currentUser"));
	}

	getUserId() {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		return user.data._id;
	}

	getUserRole() {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		return user.data.Role;
	}

	getRestaurant() {
		const restaurant = JSON.parse(
			localStorage.getItem("SelectedRestaurant")
		);
		return restaurant;
	}

	getRestaurantId() {
		const restaurantId = JSON.parse(
			localStorage.getItem("SelectedRestaurantId")
		);
		return restaurantId;
	}

	getMijnMenuPlus() {
		const restaurant = JSON.parse(
			localStorage.getItem("SelectedRestaurant")
		);
		if (!restaurant) {
			return;
		}
		const mijnmenuplus = restaurant.Restaurant.MijnMenuPlus;
		return mijnmenuplus;
	}

	getToken() {
		return JSON.parse(localStorage.getItem("token"));
	}

	// findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 	// This code imitates server calls
	// 	return this.http.get<QueryResultsModel>(
	// 		this.apiURL + "/api/user/roles"
	// 	);
	// 	// return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
	// }

	/*
	 * Register a user
	 *
	 * @param {User} user obj
	 * @returns {Observable<any>}
	 */
	register(user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http
			.post<User>(this.apiURL + "/api/user/register", user, {
				headers: httpHeaders
			})
			.pipe(
				map((response: any) => {
					if (response && response.data) {
						console.log(response);
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						// TO DO Think of logic when registering staff user. (Check on Role: 'Staff');
						localStorage.setItem(
							"currentUser",
							JSON.stringify(response)
						);
						this.currentUserSubject.next(response);
						return response;
					}
				}),
				catchError(err => {
					return null;
				})
			);
	}

	logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("SelectedRestaurant");
	}

	/*
	 * Submit forgot password request
	 *
	 * @param {string} email
	 * @returns {Observable<any>}
	 */
	public requestPassword(email: string): Observable<any> {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		const body = { EmailAddress: email };

		return this.http
			.post(this.apiURL + "/api/user/forgetPassword", body, { headers })
			.pipe(
				map((response: any) => {
					if (response && response.data.EmailAddress) {
						return response;
					}
				}),
				catchError(this.handleErrorr("forgot-password", []))
			);
	}

	resetPassword(resetPassword: any) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this.http
			.put(this.apiURL + "/api/user/resetPassword", resetPassword, {
				headers
			})
			.pipe(
				map((response: any) => response),
				catchError(this.handleErrorr("forgot-password", []))
			);
	}

	changePassword(changePassword: any) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this.http
			.put(this.apiURL + "/api/user/changePassword", changePassword, {
				headers
			})
			.pipe(map((response: any) => response));
	}

	verifyEmail(userId: string) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		const body = { _id: userId };

		return this.http
			.post(this.apiURL + "/api/user/verifyEmail", body, { headers })
			.pipe(
				map((response: any) => {
					if (response && response.data) {
						return response;
					}
				})
			);
	}

	setAvgAccepted(userId: string, avgAccepted: any) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		return this.http
			.put(
				this.apiUrl + "/api/setAvgAccepted/user/" + userId,
				avgAccepted,
				{
					headers
				}
			)
			.pipe(map((response: any) => response));
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	changeProfileImage(userId: string, base64: any): Observable<any> {
		const body = {
			PictureUrl: base64
		};

		return this.http
			.put(
				this.apiURL + "/api/uploadProfileImage/" + userId + "/base64",
				body
			)
			.pipe(map((response: any) => response));
	}

	getUserById(userId: string): Observable<User> {
		return this.http.get<User>(this.apiURL + `/api/user/${userId}`);
	}

	// DELETE => delete the user from the server
	deleteUser(userId: string) {
		console.log("DELETE USER");
		return this.http
			.delete(this.apiURL + "/api/deleteUser/" + userId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	// UPDATE => PUT: update the user on the server
	updateUser(user: User): Observable<any> {
		return this.http
			.put(this.apiURL + "/api/editUserProfile", user, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http
			.post<User>(this.apiURL + "/api/user/register", user, {
				headers: httpHeaders
			})
			.pipe(map((response: any) => response.data));
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(
		restaurantId: string,
		queryParams: QueryParamsModel
	): Observable<QueryResultsModel> {
		console.log("find LIVE Users", queryParams);
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http.get<QueryResultsModel>(
			`${this.apiURL}/${API_STAFF_URL}/${restaurantId}`
		);
	}

	// Roles
	getAllRoles(): Observable<Role[]> {
		return this.http
			.get<Role[]>(this.apiURL + "/api/user/roles")
			.pipe(map((response: any) => response.data));
	}

	getRoleById(roleId: number): Observable<Role> {
		return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
	}

	/*
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleErrorr<T>(operation = "operation", result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
}
