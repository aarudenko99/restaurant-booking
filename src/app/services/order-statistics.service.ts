import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AbstractService } from "./abstract.service";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { OrderStats } from "../common/models/orders/orderStats";

@Injectable({
	providedIn: "root"
})
export class OrderStatisticsService extends AbstractService {
	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	/**
	 ** @RevenueChart API call
	 **/
	getRevenueStats(restaurantId: string, criteria: string, filter?: string) {
		let params;

		if (filter) {
			params = new HttpParams().set("filter", filter);
		}
		return this.http
			.get(
				this.apiUrl +
					"/api/restaurants/" +
					restaurantId +
					"/revenueChart/criteria/" +
					criteria,
				{ headers: this.getHeaders(), params: params }
			)
			.pipe(map((response: any) => response));
	}

	/**
	 ** @OrderStats API call
	 **/
	getOrderStats(restaurantId: string, criteria: string, filter?: string) {
		let params;
		if (filter) {
			params = new HttpParams().set("filter", filter);
		}

		return this.http
			.get<OrderStats[]>(
				this.apiUrl +
					"/api/restaurants/" +
					restaurantId +
					"/orderQuantityStats/" +
					criteria,
				{
					headers: this.getHeaders(),
					params: filter ? params : null
				}
			)
			.pipe(map((response: any) => response));
	}
}
