import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract.service";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { FloorPlan } from "../common/models/floorplan/floorplan";
import { Table } from "../common/models/floorplan/table";
import { Reservations } from "../common/models/reservations";
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from "@angular/router";
import { AuthService } from '../core/auth';

@Injectable({
	providedIn: "root"
})
export class TableService extends AbstractService implements Resolve<any> {
	tempPlans: Array<FloorPlan> = [];
	floorPlans = new BehaviorSubject<Array<FloorPlan>>(new Array<FloorPlan>());
	enableEdit = new Subject<boolean>();

	constructor(public http: HttpClient, public globalService: GlobalService, private auth: AuthService) {
		super(http, globalService);
    }

	/**
	 ** @TableManagemenCards API calls
	 **/
	getTableManagementCardsData(restaurantId: string) {
		return this.http
			.get(this.apiUrl + "/api/tableManagementCards/" + restaurantId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getTableReservation(id: string) {
		return this.http
			.get(this.apiUrl + "/api/tableReservation/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: Response) => response));
	}

	getFloorplans(selectedRestaurantId): Observable<any> {
		console.log(selectedRestaurantId);
		return this.http
			.get(
				this.apiUrl +
					"/api/floorplan/restaurant/" +
					selectedRestaurantId,
				{
					headers: this.getHeaders()
				}
			)
			.pipe(
				map((response: any) => {
					this.floorPlans.next(response.data);
					this.tempPlans = response.data;
					return this.floorPlans.value;
				})
			);
	}

	// TO DO Delete this resolve method!
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> {
		let selectedRestaurantId;
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			selectedRestaurantId = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();

        })
        
		return this.http
			.get(
				this.apiUrl +
					"/api/floorplan/restaurant/" +
					selectedRestaurantId,
				{
					headers: this.getHeaders()
				}
			)
			.pipe(
				map((response: any) => {
					this.floorPlans.next(response.data);
                    this.tempPlans = response.data;
					return this.floorPlans.value;
				})
			);
	}

	checkOutTable(reservationCode: string) {
		return this.http
			.put(
				this.apiUrl +
					"/api/checkoutUsers/reservationCode/" +
					reservationCode,
				{},
				{
					headers: this.getHeaders()
				}
			)
			.pipe(map((response: any) => response));
	}

	addFloorPlan(floorplan: FloorPlan) {
		return this.http
			.post(this.apiUrl + "/api/floorplan", floorplan, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	updateFloorPlan(floorPlan: FloorPlan) {
		return this.http
			.put(this.apiUrl + "/api/floorplan/" + floorPlan._id, floorPlan, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteFloorPlan(floorPlanId: string) {
		return this.http
			.delete(this.apiUrl + "/api/floorplan/" + floorPlanId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	addTable(floorPlanId: string, table: Table) {
		return this.http
			.post(
				this.apiUrl + "/api/floorplan/" + floorPlanId + "/table",
				table,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	updateTable(table: Table) {
		return this.http
			.put(this.apiUrl + "/api/floorplan/table/" + table._id, table, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteTable(id: any) {
		return this.http
			.delete(this.apiUrl + "/api/floorplan/table/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	// updateStatus(table: Table) {
	// 	return this.http
	// 		.put(this.apiUrl + "/api/table/updatestatus", table, {
	// 			headers: this.getHeaders()
	// 		})
	// 		.pipe(map((response: any) => response));
	// }

	// getUserOrderByUserTable(
	// 	userId: string,
	// 	tableid: string,
	// 	restaurantId: string,
	// 	reservationCode: string
	// ) {
	// 	return this.http
	// 		.get(
	// 			this.apiUrl +
	// 				"/api/Order/user/" +
	// 				userId +
	// 				"/tableid/" +
	// 				tableid +
	// 				"/restaurant/" +
	// 				restaurantId +
	// 				"/code/" +
	// 				reservationCode,
	// 			{ headers: this.getHeaders() }
	// 		)
	// 		.pipe(map((response: any) => response));
	// }

	// getRemainingTable(restaurantId: string, tableStatus: string) {
	// 	return this.http
	// 		.get(
	// 			this.apiUrl +
	// 				"/api/table/" +
	// 				restaurantId +
	// 				"/status/" +
	// 				tableStatus,
	// 			{ headers: this.getHeaders() }
	// 		)
	// 		.pipe(map((response: any) => response));
	// }

	// TO DO CREATE ORDER SERVICE
	// getUserOrderByRestaurant(restaurantId: string) {
	//     return this.http.get(this.apiUrl + '/api/restaurant/' + restaurantId + '/Order', { headers: this.getHeaders() }).pipe(
	//         map((response: any) => response)
	//     );
	// }

	// updateOrderStatus(reservedTable: any) {
	//     return this.http.put(this.apiUrl + '/api/order/updatestatus', reservedTable, { headers: this.getHeaders() }).pipe(
	//         map((response: any) => response)
	//     );
	// }

	addTableReservation(table: any) {
		return this.http
			.post(this.apiUrl + "/api/tableReservation", table, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	updateReservedTable(reservation: Reservations) {
		return this.http
			.put(this.apiUrl + "/api/tableReservation", reservation, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	updateTableReservation(table: any) {
		return this.http
			.put(this.apiUrl + "/api/tableReservation", table, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
    }
    
    generateQrCode(tableId: string) {
		return this.http
			.get(this.apiUrl + "/api/table/generate/qrcode/" + tableId, { headers: this.getHeaders() })
			.pipe(map((response: any) => response));
    }

	// updateOrderItemStatus(reservedTable: any) {
	// 	return this.http
	// 		.put(this.apiUrl + "/api/order/updateitemstatus", reservedTable, {
	// 			headers: this.getHeaders()
	// 		})
	// 		.pipe(map((response: any) => response));
	// }

	// sendEmail(userDetail: any) {
	// 	return this.http
	// 		.post(this.apiUrl + "/api/sendMail", userDetail, {
	// 			headers: this.getHeaders()
	// 		})
	// 		.pipe(map((response: any) => response));
	// }
}
