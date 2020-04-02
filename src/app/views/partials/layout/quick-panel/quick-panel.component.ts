// Angular
import { Component, ChangeDetectorRef } from "@angular/core";
// Layout
import { OffcanvasOptions } from "../../../../core/_base/layout";
import { NotificationService } from "../../../../services/notification.service";
import * as moment from "moment";
import { RecentActivityService } from "../../../../services/recent-activity.service";
import { AuthService } from "../../../../core/auth";

@Component({
	selector: "kt-quick-panel",
	templateUrl: "./quick-panel.component.html",
	styleUrls: ["./quick-panel.component.scss"]
})
export class QuickPanelComponent {
	// Public properties
	selectedRestaurantId: string;
	notifications: Array<any> = [];
	checkInNotifications: Array<any> = [];
	orderNotifications: Array<any> = [];
	paymentNotifications: Array<any> = [];
	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: "kt-quick-panel",
		closeBy: "kt_quick_panel_close_btn",
		toggleBy: "kt_quick_panel_toggler_btn"
	};

	constructor(
		private auth: AuthService,
		private cd: ChangeDetectorRef,
		private notificationService: NotificationService,
		private recentActivityService: RecentActivityService
	) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			if (restaurantId) {
				this.selectedRestaurantId = restaurantId;
				this.getRecentActivity();
				this.getAndSortNotifications();
			}
		});
	}

	ngOnInit(): void {}

	getAndSortNotifications() {
		this.notificationService.notifications$.subscribe(notifications => {
			const now = moment().format();
			const orders = [];
			const checkIns = [];
			const payments = [];
			notifications.map(notification => {
				const difference = moment(now).diff(
					moment(notification.createdDate)
				);
				const duration = moment.duration(difference);
				const hours = Math.floor(duration.asHours());
				const minutes = moment(difference).format("m");
				const time =
					hours > 0
						? hours.toString() + " hrs ago"
						: +minutes > 0
						? minutes + " mins ago"
						: "now";
				notification.Time = time;
				switch (notification.Type) {
					case "Check-In":
						checkIns.push(notification);
						this.checkInNotifications = checkIns;
						break;
					case "Order":
						orders.push(notification);
						this.orderNotifications = orders;
						break;
					case "Transaction":
						payments.push(notification);
						this.paymentNotifications = payments;
						break;
				}
			});
			this.cd.detectChanges();
		});
	}

	getRecentActivity() {
		// if (!this.notificationService.notifications$.value.length) {
		this.recentActivityService
			.connect(this.selectedRestaurantId)
			.subscribe();
		this.recentActivityService.getRecentActivity().subscribe(response => {
			this.notifications = response.Recent_Activity;
			this.cd.detectChanges();
		});
		// }
	}
}
