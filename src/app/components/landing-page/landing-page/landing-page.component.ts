import { Component, OnInit } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { slideInRight, slideInLeft, slideInDown, slideInUp } from "ngx-animate";

@Component({
	selector: "mm-landing-page",
	templateUrl: "./landing-page.component.html",
	styleUrls: ["./landing-page.component.scss"],
	animations: [
		trigger("slideInRight", [
			transition("* => *", useAnimation(slideInRight))
		]),
		trigger("slideInLeft", [
			transition("* => *", useAnimation(slideInLeft))
		]),
		trigger("slideInDown", [
			transition("* => *", useAnimation(slideInDown))
		]),
		trigger("slideInUp", [transition("* => *", useAnimation(slideInUp))])
	]
})
export class LandingPageComponent implements OnInit {
	images: any[] = [
		"assets/media/landing-page-imgs/app-screen-12.png",
		"assets/media/landing-page-imgs/app-screen-13.png",
		"assets/media/landing-page-imgs/app-screen-1.png",
		"assets/media/landing-page-imgs/app-screen-2.png",
		"assets/media/landing-page-imgs/app-screen-3.png",
		"assets/media/landing-page-imgs/app-screen-4.png",
		"assets/media/landing-page-imgs/app-screen-5.png",
		"assets/media/landing-page-imgs/app-screen-6.png",
		"assets/media/landing-page-imgs/app-screen-7.png",
		"assets/media/landing-page-imgs/app-screen-8.png",
		"assets/media/landing-page-imgs/app-screen-9.png",
		"assets/media/landing-page-imgs/app-screen-10.png",
		"assets/media/landing-page-imgs/app-screen-11.png"
	];
	SlideOptions: any = {
		items: 1,
		dots: true,
		nav: true,
		loop: true,
		margin: 10,
		responsive: {
			0: { items: 3 },
			600: { items: 3 },
			1000: { items: 5 }
		}
	};

	constructor() {}

	ngOnInit() {}
}
