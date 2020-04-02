import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RequestObject } from "../objects/RequestObject";
import { AbstractService } from "./abstract.service";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { Reservations } from "../common/models/reservations";

@Injectable({
	providedIn: "root"
})
export class ReservationService extends AbstractService {
	reservations: Array<Reservations>;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	getReservations(id: string) {
		return this.http
			.get(this.apiUrl + "/api/restaurant/" + id + "/tableReservation", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getUpcomingReservations(id: string) {
		return this.http
			.get(
				this.apiUrl + "/api/restaurants/" + id + "/activeReservations",
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	updateReservations(reservation: Reservations) {
		return this.http
			.put(this.apiUrl + "/api/tableReservation", reservation, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteReservation(id: string) {
		return this.http
			.delete(this.apiUrl + "/api/tableReservation/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
}
