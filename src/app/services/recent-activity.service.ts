import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";
import { AbstractController } from "../controllers/abstract/abstract.controller";

@Injectable({
	providedIn: "root"
})
export class RecentActivityService extends AbstractController {
	connected: Observable<boolean>;
	recentActivity: Observable<any>;
	// waiterCalled: Observable<any>;

	constructor(injector: Injector, public socket: Socket) {
		super(injector);
	}

	// ----------------------------------------------
	// --- TO DO Create Global socket connection.----
	// ----------------------------------------------
	connect(restaurantId) {
		this.socket.connect();
		this.socket.emit("connectWithSocket", {
			id: restaurantId ? restaurantId : this.auth.getRestaurantId()
		});

		return (this.connected = new Observable(observer => {
			this.socket.on("connected", data => observer.next(true));
			this.socket.emit("recentActivity", { RestaurantId: restaurantId });
		}));
	}

	getRecentActivity() {
		return (this.recentActivity = new Observable(observer => {
			this.socket.on("recentActivity", data => observer.next(data));
		}));
	}

	callWaiter(): Observable<any> {
		return new Observable(observer => {
			this.socket.on("callWaiter", data => {
				observer.next(data);
			});
		});
	}

	cashPayment(): Observable<any> {
		return new Observable(observer => {
			this.socket.on("cashPayment", data => {
				observer.next(data);
			});
		});
	}

	tableCheckOut() {
		return new Observable(observer => {
			this.socket.on("checkOut", data => {
				observer.next(data);
			});
		});
	}
}
