import { Injectable } from "@angular/core";
import { RestaurantGoals } from "../common/models/restaurant-goals";
import { AppSettings } from "../app.settings";
import { AbstractService } from "./abstract.service";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class RestaurantGoalsService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}
	getGoalsByRestaurant(id: any, currentMonth: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/goals/" +
					currentMonth,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	getRestaurantGoals() {
		return this.http
			.get(this.apiURL + "/api/restaurantgoals", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	update(menu: RestaurantGoals) {
		return this.http
			.put(this.apiURL + "/api/restaurantgoals", menu, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	add(menu: RestaurantGoals) {
		return this.http
			.post(this.apiURL + "/api/restaurantgoals", menu, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	delete(id: any) {
		return this.http
			.delete(this.apiURL + "/api/restaurantgoals/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
}
