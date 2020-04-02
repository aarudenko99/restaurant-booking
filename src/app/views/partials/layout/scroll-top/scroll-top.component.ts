// Angular
import { Component, HostListener, OnInit } from "@angular/core";
// Layout
import { ScrollTopOptions } from "../../../../core/_base/layout";

@Component({
	selector: "kt-scroll-top",
	templateUrl: "./scroll-top.component.html",
	styleUrls: ["./scroll-top.component.scss"]
})
export class ScrollTopComponent implements OnInit {
	scrollTopOptions: ScrollTopOptions = {
		offset: 300,
		speed: 600,
		toggleClass: "kt-scrolltop--on"
	};

	ngOnInit() {}

	// Public properties

	scrollToTop() {
		(function smoothscroll() {
			const currentScroll =
				document.documentElement.scrollTop || window.scrollY;

			if (currentScroll > 0) {
				window.requestAnimationFrame(smoothscroll);
				window.scrollTo(0, currentScroll - currentScroll / 8);
			}
		})();
	}
}
