import { Injectable } from "@angular/core";
import { RestaurantTips } from "../common/models/restaurant-tips";
import { RestaurantSpendure } from "../common/models/restaurant-spendure";
import { RestaurantGrowth } from "../common/models/restaurant-growth";
import { AppSettings } from "../app.settings";
import { AbstractService } from "./abstract.service";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class DashboardService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	/**
	 ** @DashboardCards API calls
	 **/
	getDashboardCardsData(restaurantId: string) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurants/" +
					restaurantId +
					"/dashboardCards",
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	/**
	 ** @Tips API calls
	 **/
	getAverageTipsByRestaurant(id: any, currentMonth: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/tips/month/" +
					currentMonth,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	getAverageTipsByRestaurantdate(id: any, date: any) {
		return this.http
			.get(this.apiURL + "/api/restaurant/" + id + "/tips/" + date, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getAverageTipsByRestaurantRange(id: any, startDate: any, enddate: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/tips/" +
					startDate +
					"/" +
					enddate,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	getRestaurantTips() {
		return this.http
			.get(this.apiURL + "/api/restauranttips", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getAverageTipsYear(id: any, year: any) {
		return this.http
			.get(this.apiURL + "/api/restaurant/" + id + "/tipsyear/" + year, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	updateTips(menu: RestaurantTips) {
		return this.http
			.put(this.apiURL + "/api/restauranttips", menu, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	addTips(menu: RestaurantTips) {
		return this.http
			.post(this.apiURL + "/api/restauranttips", menu, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteTips(id: any) {
		return this.http
			.delete(this.apiURL + "/api/restauranttips/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/**
	 ** @Spendure API calls
	 **/
	getSpendureByRestaurant(id: any, date: any) {
		return this.http
			.get(this.apiURL + "/api/restaurant/" + id + "/spendure/" + date, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	getSpendureByRestaurantRange(id: any, startDate: any, enddate: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/spendure/" +
					startDate +
					"/" +
					enddate,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	getSpendureByRestaurantMonth(id: any, currentMonth: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/spendure/month/" +
					currentMonth,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	getAverageSpendureYear(id: any, year: any) {
		return this.http
			.get(
				this.apiURL + "/api/restaurant/" + id + "/spendureyear/" + year,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	addSpendure(spendure: RestaurantSpendure) {
		return this.http
			.post(this.apiURL + "/api/restaurantspendure", spendure, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	updateSpendure(spendure: RestaurantSpendure) {
		return this.http
			.put(this.apiURL + "/api/restaurantspendure", spendure, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	/// end Spendure

	/**
	 ** @Growth API calls
	 **/
	getgrowthByRestaurant(id: any, date: any) {
		return this.http
			.get(this.apiURL + "/api/restaurant/" + id + "/growth/" + date, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	getgrowthByRestaurantRange(id: any, startDate: any, enddate: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/growth/" +
					startDate +
					"/" +
					enddate,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	getgrowthByRestaurantMonth(id: any, currentMonth: any) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurant/" +
					id +
					"/growth/month/" +
					currentMonth,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	getAveragegrowthYear(id: any, year: any) {
		return this.http
			.get(
				this.apiURL + "/api/restaurant/" + id + "/growthyear/" + year,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}
	addgrowth(growth: RestaurantGrowth) {
		return this.http
			.post(this.apiURL + "/api/restaurantgrowth", growth, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	updategrowth(growth: RestaurantGrowth) {
		return this.http
			.put(this.apiURL + "/api/restaurantgrowth", growth, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
	/// end Growth
}
