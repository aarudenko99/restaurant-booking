import { Injectable, Injector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Socket } from "ngx-socket-io";
import { AbstractController } from "../controllers/abstract/abstract.controller";
import { FloorPlan } from "../common/models/floorplan/floorplan";

@Injectable({
	providedIn: "root"
})
export class FloorplanService extends AbstractController {
	connected: Observable<boolean>;
	floorplan: Observable<FloorPlan>;    
    saveData = new Subject<any>();

	constructor(injector: Injector, public socket: Socket) {
		super(injector);
    }

	connect(restaurantId) {
		this.socket.connect();
		this.socket.emit("connectWithSocket", {
			id: restaurantId ? restaurantId : this.auth.getRestaurantId()
		});

		return (this.connected = new Observable(observer => {
			this.socket.on("connected", data => observer.next(true));
		}));
	}

	getFloorplan(): Observable<any> {
		return (this.floorplan = new Observable(observer => {
			this.socket.on("getFloorPlan", data => observer.next(data));
		}));
    }
    
    public setupSet(saveData) {
        this.saveData.next({saveData: saveData});
    }

    public setupGet(): Observable<any> {
        return this.saveData.asObservable();
    }
}
