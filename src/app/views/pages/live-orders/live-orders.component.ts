import { AuthService } from "./../../../core/auth";
import { Component, OnInit, Injector, ChangeDetectorRef } from "@angular/core";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { LiveOrderService } from "../../../services/live-order.service";
import { TableOrder } from "../../../common/models/orders/table-order";

@Component({
	selector: "kt-live-orders",
	templateUrl: "./live-orders.component.html",
	styleUrls: ["./live-orders.component.scss"]
})
export class LiveOrdersComponent extends AbstractController implements OnInit {
	tableOrders: Array<TableOrder>;
	selectedState: string;
	auth: AuthService;
	liveOrderStates = [
		{
			icon: "fa fa-sync-alt",
			text: "Active"
		},
		{
			icon: "flaticon2-download",
			text: "Received"
		},
		{
			icon: "fa fa-hourglass-start",
			text: "Prepared"
		},
		{
			icon: "flaticon2-check-mark",
			text: "Done"
		}
	];

	constructor(
		injector: Injector,
		private cd: ChangeDetectorRef,
		private liveOrderSocket: LiveOrderService
	) {
		super(injector);
		this.auth = this.injector.get(AuthService);
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.SelectedRestaurantId = restaurantId;
		});
	}

	ngOnInit() {
		this.selectedState = "Active";
		this.liveOrderSocket
			.getLiveOrders()
			.subscribe(test => console.log("ALL ORDERS", test));
	}

	filteredOrders(data: any) {
		console.log("filteredOrders", data);
		this.tableOrders = data;
	}

	filterOrders(filter: string) {
		this.selectedState = filter;
		filter === "Active" ? (filter = "Received Prepared Serving") : null;
		this.showLoading();
		this.liveOrderSocket
			.filterLiveOrders(filter, this.SelectedRestaurantId)
			.subscribe(
				tableOrders => {
					console.log(tableOrders);
					this.hideLoading();
					this.tableOrders = tableOrders.data;
					this.cd.detectChanges();
				},
				err => {
					this.hideLoading();
				}
			);
	}

	// updateReservationStatus(order, status) {
	//   Helpers.setLoading(true);
	//   const orderData = { _id: order.ReservationId, OrderStatus: status, ItemId: order.Order._id };
	//   this.tableService.updateOrderItemStatus(orderData).subscribe(
	//     data => {
	//       this.GetRestaurantOrders();
	//     },
	//     error => {
	//       Helpers.setLoading(false);
	//     });
	// }

	// onTap(i) {
	//   if (this.RestaurantOrders[i].tap === undefined) {
	//     this.RestaurantOrders[i].tap = 1;
	//   } else if (this.RestaurantOrders[i].tap < 2) {
	//     this.RestaurantOrders[i].tap = this.RestaurantOrders[i].tap + 1;
	//   }
	//   if (!!this.RestaurantOrders[i].tap) {
	//     const status = this.RestaurantOrders[i].OrderStatus;
	//     if (this.RestaurantOrders[i].tap === 2) {
	//       if (status === 'Received') {
	//         this.updateReservationStatus(this.RestaurantOrders[i] , 'Prepared');
	//         this.RestaurantOrders[i].OrderStatus = 'Prepared';
	//       }
	//       if (status === 'Prepared') {
	//         this.updateReservationStatus(this.RestaurantOrders[i] , 'Serving');
	//         this.RestaurantOrders[i].OrderStatus = 'Serving';
	//       }
	//       if (status === 'Serving') {
	//         this.updateReservationStatus(this.RestaurantOrders[i] , 'done');
	//       }
	//     }
	//   }
	// }

	// changeStatus(status) {
	//   this.updateReservationStatus(this.selectOrder, status);
	// }
}
