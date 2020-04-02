import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract.service";
import { GlobalService } from "./global.service";
import { AuthService } from "../core/auth";
import { AbstractController } from "../controllers/abstract/abstract.controller";
import { map } from "rxjs/operators";
import { TableOrder } from "../common/models/orders/table-order";

@Injectable({
	providedIn: "root"
})
export class LiveOrderService extends AbstractService {
	connected: Observable<boolean>;
	orderStatus: Observable<any>;
	liveOrders: Observable<any>;
	allOrders: Observable<any>;
	paymentSuccesful: Observable<any>;

	constructor(
		public http: HttpClient,
		public globalService: GlobalService,
		private auth: AuthService,
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
			this.socket.emit("getAllOrders", { RestaurantId: restaurantId });
			this.socket.emit("getLiveOrder", { RestaurantId: restaurantId });
		}));
	}

	getAllOrders() {
		return (this.allOrders = new Observable(observer => {
			this.socket.on("getAllOrders", data => observer.next(data));
		}));
	}

	getOrderStatus() {
		return (this.orderStatus = new Observable(observer => {
			this.socket.on("orderStatus", data => observer.next(data));
		}));
	}

	filterLiveOrders(filter: string, restaurantId) {
		this.socket.emit("getLiveOrderFilterBy", {
			RestaurantId: restaurantId,
			filterBy: filter
		});
		return (this.liveOrders = new Observable(observer => {
			this.socket.on("getLiveOrderFilterBy", data => observer.next(data));
		}));
	}

	getLiveOrders(): Observable<any> {
		return (this.liveOrders = new Observable(observer => {
			this.socket.on("getLiveOrder", data => observer.next(data));
		}));
	}

	updateOrderStatus(orderId: string, status: string): void {
		this.socket.emit("updateOrderStatus", { _id: orderId, Status: status });
	}

	updateTableOrder(tableOrder: TableOrder) {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this.http
			.put(this.apiUrl + "/api/editOrder/" + tableOrder._id, tableOrder, {
				headers
			})
			.pipe(map((response: any) => response));
	}

	getPaymentStatus(): Observable<any> {
		return (this.paymentSuccesful = new Observable(observer => {
			this.socket.on("paymentSuccess", data => observer.next(data));
		}));
	}
}
