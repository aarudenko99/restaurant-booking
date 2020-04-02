import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
declare var $: any;

@Component({
	selector: "mm-landing-page-layout",
	templateUrl: "./landing-page-layout.component.html",
	styleUrls: ["./landing-page-layout.component.scss"]
})
export class LandingPageLayoutComponent implements OnInit {
	activeLinkId: any = 0;

	constructor(private router: Router) {}

	ngOnInit() {
		let viewId = this;

		console.log(this.router.url);
		this.determineActiveUrl();
		jQuery(function($) {
			// $(".header").easeScroll();

			$(window).scroll(function() {
				if ($(".navbar").offset().top > 30) {
					$(".navbar.fixed-top").addClass("top-nav-collapse");
					if (viewId.activeLinkId == 0) {
						$(".navbar.fixed-top").removeClass("home-nav");
					}
				} else {
					$(".navbar.fixed-top").removeClass("top-nav-collapse");
					if (viewId.activeLinkId == 0) {
						$(".navbar.fixed-top").addClass("home-nav");
					}
					$(".navbar.fixed-top").addClass("top-nav-collapse-rm-bx");
				}
			});

			$(window).on("scroll", function(e) {
				if ($(this).scrollTop() != 0) {
					$("#toTop").fadeIn();
				} else {
					$("#toTop").fadeOut();
				}
			});

			$("#toTop").on("click", function() {
				$("html, body").animate({ scrollTop: 0 }, 600);
				return false;
			});
		});
	}

	determineActiveUrl() {
		switch (this.router.url) {
			case "/home":
				this.changeActiveLink(0);
				break;

			case "/mijn-menu":
				this.changeActiveLink(1);
				break;

			case "/mijn-restaurant":
				this.changeActiveLink(2);
				break;

			case "/about":
				this.changeActiveLink(3);
				break;

			case "/tarieven":
				this.changeActiveLink(4);
				break;
		}
	}

	changeActiveLink(linkId) {
		this.activeLinkId = linkId;
	}

	setHomePageNav() {}
}
