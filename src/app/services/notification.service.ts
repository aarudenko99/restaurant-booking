import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LiveOrderService } from "./live-order.service";
import { FloorplanService } from "./floorplan.service";
import { TableOrder } from "../common/models/orders/table-order";
import { AuthService } from "../core/auth";
import { BehaviorSubject } from "rxjs";
import * as moment from "moment";
import { take } from "rxjs/operators";
import { RecentActivityService } from "./recent-activity.service";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class NotificationService {
	notifications$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	tableOrders: Array<TableOrder> = [];

	constructor(
		private router: Router,
		private auth: AuthService,
		private toastr: ToastrService,
		private liveOrderSocket: LiveOrderService,
		private checkinSocket: FloorplanService,
		private recentActivitySocket: RecentActivityService
	) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			console.log(this.liveOrderSocket.connected);

			this.liveOrderSocket.connect(restaurantId).subscribe(connected => {
				if (connected) {
					return;
				}
				console.log("connected", connected);
			});
			this.checkinSocket.connect(restaurantId).subscribe(connected => {
				if (connected) {
					return;
				}
				console.log("CONNECTED FLOOR PLAN", connected);
			});
		});
	}

	connect() {
		this.liveOrderSocket.getOrderStatus().subscribe(orderStatus => {
			const userRole = this.auth.getUserRole();
			if (orderStatus === "Serving" && userRole === "Waiter") {
				const notification = {
					toastrType: "success",
					Type: "order",
					Tessage: "Order is ready for Serving!",
					Title: "Order Ready",
					cssClass: "order-toastr",
					createdDate: moment().format()
				};
				this.showToastr(notification);
			}
		});

		this.liveOrderSocket.getLiveOrders().subscribe(tableOrders => {
			if (
				this.tableOrders.length &&
				this.tableOrders.length < tableOrders.data.length &&
				tableOrders["newOrder"]
			) {
				const notification = {
					Type: "Order",
					Text: `Order placed for Table: ${tableOrders.newOrder.TableNr}`,
					Title: "Order Received",
					cssClass: "order-toastr left-border-green",
					icon: "/assets/media/icons/svg/Cooking/Knife&fork2.svg",
					svgIcon: true,
					createdDate: moment().format()
				};
				this.showToastr(notification);
			}
			this.tableOrders = tableOrders.data;
		});

		this.checkinSocket.getFloorplan().subscribe(floorplan => {
			const notification = {
				Type: "Check-In",
				Text: `User Checked in at Table: ${floorplan.table.TableNr} - (${floorplan.table.SeatsOccupied}/${floorplan.table.Seats})`,
				Title: "Check in",
				cssClass: "checkin-toastr left-border-purple",
				icon: "assets/media/icons/svg/Notification/CheckIn-Toastr.svg",
				svgIcon: true,
				createdDate: moment().format()
			};

			this.showToastr(notification);
		});

		this.liveOrderSocket.getPaymentStatus().subscribe(successfulPayment => {
			const notification = {
				Type: "Transaction",
				Text: `Payment received from Table: ${successfulPayment.TableDetails.TableNr}`,
				Title: `Payment Received #${successfulPayment.ReservationCode}`,
				cssClass: "payment-toastr left-border-turqoise",
				icon: "assets/media/icons/svg/Shopping/Credit-card.svg",
				svgIcon: true,
				createdDate: moment().format()
			};
			this.showToastr(notification);
		});

		this.recentActivitySocket.callWaiter().subscribe(waiterCalled => {
			const notification = {
				Type: "Call-Waiter",
				Text: `Table ${waiterCalled.TableDetails.TableNr} needs some help.`,
				Title: `${waiterCalled.Message}`,
				cssClass: "call-waiter-toastr left-border-primary",
				icon: "assets/media/icons/svg/General/Notifications.svg",
				svgIcon: true,
				createdDate: moment().format()
			};
			this.showToastr(notification);
		});

		this.recentActivitySocket
			.cashPayment()
			.subscribe(cashPaymentRequest => {
				const notification = {
					Type: "Call-Waiter",
					Title: `Cash Payment`,
					Text: `Table ${cashPaymentRequest.Table.TableNr} would like to pay with Cash.`,
					cssClass: "cash-payment-toastr left-border-red",
					icon:
						"assets/media/icons/svg/Notification/CashPayment-Toastr.svg",
					svgIcon: true,
					createdDate: moment().format()
				};
				this.showToastr(notification);
			});

		// Check out subscription //
		// Also for check out we wanna get the updated floorplan
		// TO DO Create 1 socket event (Recent Activity) which shows the notifications.
		this.recentActivitySocket.tableCheckOut().subscribe(tableCheckout => {
			console.log("CHECKOUT", tableCheckout);
			const notification = {
				Type: "Check-Out",
				Title: `Table Check Out`,
				Text: `Table ${tableCheckout["table"].TableNr} did check out, the table is vacant.`,
				cssClass: "checkout-toastr left-border-yellow",
				icon:
					"assets/media/icons/svg/Notification/CashPayment-Toastr.svg",
				svgIcon: true,
				createdDate: moment().format()
			};
			this.showToastr(notification);
		});
	}

	showToastr(notification: any) {
		if (notification.Type) {
			const toast = this.toastr
				.show(notification.Text, notification.Title, {
					toastClass: "ngx-toastr " + notification.cssClass
				})
				.onTap.pipe(take(1))
				.subscribe(action => {
					switch (notification.Type) {
						case "Order":
							this.router.navigate(["/dashboard/liveorders"]);
							break;
						case "Check-In":
							this.router.navigate([
								"/dashboard/tablemanagement"
							]);
							break;
						case "Transaction":
							this.router.navigate(["/dashboard/activebills"]);
							break;
					}
				});
			const notifications = this.notifications$.value;
			const updatedNotifications = [...notifications, notification];
			this.notifications$.next(updatedNotifications);
		}
	}

	showHTMLMessage(message, title) {
		this.toastr.success(message, title, {
			enableHtml: true
		});
	}

	showToastrWithTimeout(message, title, timespan) {
		this.toastr.success(message, title, {
			timeOut: timespan
		});
	}
}
