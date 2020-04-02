import { Component, OnInit } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { slideInRight, slideInLeft } from "ngx-animate";

@Component({
	selector: "mm-mijn-restaurant",
	templateUrl: "./mijn-restaurant.component.html",
	styleUrls: ["./mijn-restaurant.component.scss"],
	animations: [
		trigger("slideInRight", [
			transition("* => *", useAnimation(slideInRight))
		]),
		trigger("slideInLeft", [
			transition("* => *", useAnimation(slideInLeft))
		])
	]
})
export class MijnRestaurantComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
