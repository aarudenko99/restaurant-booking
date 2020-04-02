import { Injectable } from "@angular/core";
import { Restaurant } from "../common/models/restaurant";
import { AppSettings } from "../app.settings";
import { AbstractService } from "./abstract.service";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class RestaurantService extends AbstractService {
	SelectedRestaurant: Restaurant;
	public restaurants = new BehaviorSubject<Array<any>>(new Array<any>());
	apiURL = AppSettings.API_ENDPOINT;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	set selectRestaurant(restaurant: Restaurant) {
		localStorage.setItem("SelectedRestaurant", JSON.stringify(restaurant));
		localStorage.setItem(
			"SelectedRestaurantId",
			JSON.stringify(restaurant["Restaurant"]._id)
		);
	}

	get selectedRestaurant() {
		if (localStorage.getItem("SelectedRestaurant") !== "undefined") {
			this.SelectedRestaurant = JSON.parse(
				localStorage.getItem("SelectedRestaurant")
			);
			return this.SelectedRestaurant;
		}
	}

	getAllRestaurant() {
		return this.http
			.get(this.apiURL + "/api/restaurant", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getRestaurantFeatures() {
		return this.http
			.get(this.apiURL + "/api/restaurantFeatures", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getRestaurantById(id: string) {
		return this.http
			.get(this.apiURL + "/api/restaurant/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	uploadImages(formData) {
		const header = this.getHeaders()
			.delete("content-type")
			.append("Accept", "application/json");
		return this.http
			.post(this.apiURL + "/api/uploadRestaurantImage", formData, {
				headers: header
			})
			.pipe(map((response: any) => response));
	}

	getRestaurantDrp() {
		return this.http
			.get(this.apiURL + "/api/get/restaurant", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getAllRestaurantByUser(id: any) {
		return this.http
			.get(this.apiURL + "/api/restaurant/user/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	update(restaurant: Restaurant) {
		return this.http
			.put(this.apiURL + "/api/restaurant", restaurant, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	add(restaurant: Restaurant) {
		restaurant.OpeningHours.forEach((element, index) => {
			delete restaurant.OpeningHours[index].selectedOpeningTime;
			delete restaurant.OpeningHours[index].selectedClosingTime;
		});
		restaurant.DietaryTypes = [];
		delete restaurant.RestaurantCategoryName;
		const header = this.getHeaders().delete("content-type");
		const formData = new FormData();
		// Object.keys(restaurant).forEach(key => {
		// 	if (key === 'OpeningHours' || key === 'ImageUrls' || key === 'DietaryTypes'
		// 	|| key === 'TimeSlots' || key === 'Tags' || key === 'RestaurantFeatures') {
		// 		formData.append(key, JSON.stringify(restaurant[key]));
		// 	} else {
		// 		formData.append(key, restaurant[key]);
		// 	}

		// });
		return this.http
			.post(this.apiURL + "/api/restaurant", restaurant, {
				headers: header
			})
			.pipe(map((response: any) => response));
	}

	delete(id: any) {
		return this.http
			.delete(this.apiURL + "/api/restaurant/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	postFile(fileToUpload: FormData, id: any) {
		return this.http
			.post(
				this.apiURL + "/api/upload/Restaurant/" + id + "/image",
				fileToUpload
			)
			.pipe(map((response: any) => response));
	}

	getImages(id: any) {
		return this.http
			.get(this.apiURL + "/api/images/" + id + "/Restaurant", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	uploadBase64Image(requestBody) {
		return this.http
			.post(this.apiURL + '/api/uploadRestaurantImage', requestBody ,{
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
}
