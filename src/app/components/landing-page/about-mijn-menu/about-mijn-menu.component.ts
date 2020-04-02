import { Component, OnInit } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { slideInRight, slideInLeft } from "ngx-animate";

@Component({
	selector: "mm-about-mijn-menu",
	templateUrl: "./about-mijn-menu.component.html",
	styleUrls: ["./about-mijn-menu.component.scss"],
	animations: [
		trigger("slideInRight", [
			transition("* => *", useAnimation(slideInRight))
		]),
		trigger("slideInLeft", [
			transition("* => *", useAnimation(slideInLeft))
		])
	]
})
export class AboutMijnMenuComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
