// Angular
import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotificationService } from "../../../../../services/notification.service";
import * as moment from "moment";
// import { duration } from 'moment-duration-format';

@Component({
	selector: "kt-notification",
	templateUrl: "./notification.component.html",
	styleUrls: ["notification.component.scss"]
})
export class NotificationComponent {
	// Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon: string = "flaticon2-bell-alarm-symbol";
	@Input() iconType: "" | "success";

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: "light" | "dark" = "light";

	@Input() type: "brand" | "success" = "success";
	notifications: Array<any> = [];
	checkInNotifications: Array<any> = [];
	orderNotifications: Array<any> = [];

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(
		private notificationService: NotificationService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.notificationService.notifications$.subscribe(notifications => {
			const now = moment().format();
			const orders = [];
			const checkIns = [];
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
				if (notification.Type === "Check-In") {
					checkIns.push(notification);
					this.checkInNotifications = checkIns;
				} else if (notification.Type === "Order") {
					orders.push(notification);
					this.orderNotifications = orders;
				}
			});
			this.notifications = notifications;
		});
	}

	ngAfterViewInit(): void {
		//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		//Add 'implements AfterViewInit' to the class.
		console.log("afterViewINint");
	}

	backGroundStyle(): string {
		if (!this.bgImage) {
			return "none";
		}

		return "url(" + this.bgImage + ")";
	}
}
