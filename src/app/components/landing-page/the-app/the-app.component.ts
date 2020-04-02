import { Component, OnInit } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { slideInRight, slideInLeft } from "ngx-animate";

@Component({
	selector: "mm-the-app",
	templateUrl: "./the-app.component.html",
	styleUrls: ["./the-app.component.scss"],
	animations: [
		trigger("slideInRight", [
			transition("* => *", useAnimation(slideInRight))
		]),
		trigger("slideInLeft", [
			transition("* => *", useAnimation(slideInLeft))
		])
	]
})
export class TheAppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
