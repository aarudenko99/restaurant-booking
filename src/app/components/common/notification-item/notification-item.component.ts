import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "mm-notification-item",
	templateUrl: "./notification-item.component.html",
	styleUrls: ["./notification-item.component.scss"]
})
export class NotificationItemComponent implements OnInit {
	@Input() type: string;
	@Input() text: string;
	@Input() time: string;

	constructor() {}

	ngOnInit() {}
}
