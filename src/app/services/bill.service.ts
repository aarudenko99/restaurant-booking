import { Injectable, Injector } from "@angular/core";
import { AppSettings } from "../app.settings";
import { AbstractService } from "./abstract.service";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";
import { AuthService } from "../core/auth";

@Injectable({
	providedIn: "root"
})
export class BillService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;
	connected: Observable<boolean>;
	bills: Observable<any>;
	allBills: Observable<any>;

	constructor(
		public http: HttpClient,
		private auth: AuthService,
		public globalService: GlobalService,
		public socket: Socket
	) {
		super(http, globalService);
	}

	connect(restaurantId) {
		this.socket.connect();
		this.socket.emit("connectWithSocket", {
			id: restaurantId ? restaurantId : this.auth.getRestaurantId()
		});

		return (this.connected = new Observable(observer => {
			this.socket.on("connected", data => observer.next(true));
			this.socket.emit("getAllBills", { RestaurantId: restaurantId });
		}));
	}

	getAllBills() {
		return (this.allBills = new Observable(observer => {
			this.socket.on("getAllBills", data => observer.next(data));
		}));
	}

	getActiveBills(): Observable<any> {
		return new Observable(observer => {
			this.socket.on("liveActiveBills", data => observer.next(data));
		});
	}

	filterBills(filter: string, restaurantId: string) {
		this.socket.emit("getBillFilterBy", {
			RestaurantId: restaurantId,
			Filter: filter
		});
		return (this.bills = new Observable(observer => {
			this.socket.on("getBillFilterBy", data => observer.next(data));
		}));
	}

	updateBillStatus(reservationCode: string, restaurantId: string) {
		console.log(reservationCode, restaurantId);
		this.socket.emit("updateBillStatus", {
			ReservationCode: reservationCode,
			RestaurantId: restaurantId
		});
		return new Observable(observer => {
			this.socket.on("updateBillStatus", data => observer.next(data));
		});
	}

	getBills(id: string, status: string) {
		return this.http
			.get(
				this.apiURL +
					"/api/restaurants/" +
					id +
					"/orders/TableBill/" +
					status,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	getTableBill(reservationCode: string) {
		return this.http
			.get(this.apiURL + "/api/tableBill/" + reservationCode, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
}
