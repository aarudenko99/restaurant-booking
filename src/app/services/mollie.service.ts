import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract.service";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { Authorization } from "../common/models/mollie/authorization";

@Injectable({
	providedIn: "root"
})
export class MollieService extends AbstractService {
	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	mollieAuth(authorization: any) {
		return this.http
			.post(this.apiUrl + "/api/mollie/authorize", authorization, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getAccessToken(authorization: Authorization) {
		return this.http
			.post(this.apiUrl + "/api/mollie/accessToken", authorization, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getMollieProfile(restaurantId: string) {
		return this.http
			.get(this.apiUrl + "/api/mollie/Profile" + restaurantId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getMollieMandate(restaurantId) {
		return this.http
			.get(this.apiUrl + "/api/mollie/mandateDetails/" + restaurantId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getMollieSubscription(restaurantId) {
		return this.http
			.get(
				this.apiUrl +
					"/api/mollie/subscriptions/restaurant/" +
					restaurantId,
				{
					headers: this.getHeaders()
				}
			)
			.pipe(map((response: any) => response));
	}

	createMollieCustomer(restaurantId: string) {
		return this.http
			.post(
				this.apiUrl + "/api/mollie/createCustomer",
				{ RestaurantId: restaurantId },
				{
					headers: this.getHeaders()
				}
			)
			.pipe(map((response: any) => response));
	}

	createMollieMandate(mandateDetails: object) {
		return this.http
			.post(this.apiUrl + "/api/mollie/createMandate", mandateDetails, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	activateSubscription(subscriptionDetails: object) {
		return this.http
			.post(
				this.apiUrl + "/api/mollie/monthlySubscription",
				subscriptionDetails,
				{
					headers: this.getHeaders()
				}
			)
			.pipe(map((response: any) => response));
	}

	/**
	 * @body RestaurantId, SubscriptionId
	 */
	deactivateSubscription(data: object) {
		const options = {
			headers: this.getHeaders(),
			body: data
		};
		return this.http
			.delete(this.apiUrl + "/api/mollie/monthlySubscription", options)
			.pipe(map((response: any) => response));
	}
}
