import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild
} from "@angular/core";
import { filter } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import * as objectPath from "object-path";
import { AuthService } from "../../../../core/auth";
// Layout
import {
	LayoutConfigService,
	MenuAsideService,
	MenuOptions,
	OffcanvasOptions
} from "../../../../core/_base/layout";
import { HtmlClassService } from "../html-class.service";

@Component({
	selector: "kt-aside-left",
	templateUrl: "./aside-left.component.html",
	styleUrls: ["./aside-left.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit {
	@ViewChild("asideMenu", { static: true }) asideMenu: ElementRef;
	selectedRestaurantId: string;
	currentRouteUrl: string = "";
	insideTm: any;
	outsideTm: any;

	menuCanvasOptions: OffcanvasOptions = {
		baseClass: "kt-aside",
		overlay: true,
		closeBy: "kt_aside_close_btn",
		toggleBy: {
			target: "kt_aside_mobile_toggler",
			state: "kt-header-mobile__toolbar-toggler--active"
		}
	};

	menuOptions: MenuOptions = {
		// vertical scroll
		scroll: null,

		// submenu setup
		submenu: {
			desktop: {
				// by default the menu mode set to accordion in desktop mode
				default: "dropdown"
			},
			tablet: "accordion", // menu set to accordion in tablet mode
			mobile: "accordion" // menu set to accordion in mobile mode
		},

		// accordion setup
		accordion: {
			expandAll: false // allow having multiple expanded accordions in the menu
		}
	};
	restaurants: any;
	restaurantQty: number;
	selectedRestaurant: any;
	user: any;
	roles: string;
	showAll: boolean;
	showWaiter: boolean;
	mijnMenuPlus: boolean;
	/**
	 * Component Conctructor
	 *
	 * @param htmlClassService: HtmlClassService
	 * @param menuAsideService
	 * @param layoutConfigService: LayouConfigService
	 * @param router: Router
	 * @param render: Renderer2
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(
		public htmlClassService: HtmlClassService,
		public menuAsideService: MenuAsideService,
		public layoutConfigService: LayoutConfigService,
		private router: Router,
		private render: Renderer2,
		private cdr: ChangeDetectorRef,
		private auth: AuthService
	) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.selectedRestaurantId = restaurantId;
		});
	}

	ngOnInit() {
		this.auth.selectedRestaurant.subscribe(selectedRestaurant => {
			console.log('SELCETD', selectedRestaurant);
			console.log(JSON.parse(localStorage.getItem('currentUser')));
			
			
			if (
				!Object.keys(selectedRestaurant).length &&
				!this.auth.getRestaurant()
			) {
				this.mijnMenuPlus = false;
				return;
			}

			const restaurant = Object.keys(selectedRestaurant).length
				? selectedRestaurant
				: this.auth.getRestaurant();

			this.mijnMenuPlus = restaurant["Restaurant"].MijnMenuPlus;
			this.cdr.detectChanges();
		});

		this.setRoles();

		this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
				this.cdr.markForCheck();
			});

		const config = this.layoutConfigService.getConfig();

		if (
			objectPath.get(config, "aside.menu.dropdown") !== true &&
			objectPath.get(config, "aside.self.fixed")
		) {
			this.render.setAttribute(
				this.asideMenu.nativeElement,
				"data-ktmenu-scroll",
				"1"
			);
		}

		if (objectPath.get(config, "aside.menu.dropdown")) {
			this.render.setAttribute(
				this.asideMenu.nativeElement,
				"data-ktmenu-dropdown",
				"1"
			);

			this.render.setAttribute(
				this.asideMenu.nativeElement,
				"data-ktmenu-dropdown-timeout",
				objectPath.get(
					config,
					"aside.menu.submenu.dropdown.hover-timeout"
				)
			);
		}
		this.cdr.detectChanges();
	}

	setRoles() {
		if (this.auth.getCurrentUser()) {
			this.user = this.auth.getCurrentUser().data;
			if (this.user.Role === "Admin" || this.user.Role === "Manager") {
				this.roles = "admin&manager";
				this.showAll = true;
			}
			if (this.user.Role === "Waiter") {
				this.roles = "admin&manager&waiter";
				this.showWaiter = true;
			}
			if (this.user.Role === "Kitchen") {
				this.roles = "admin&manager&waiter&kitchen";
			}
		}
	}

	/**
	 * Check Menu is active
	 * @param item: any
	 */
	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}

	/**
	 * Check Menu Root Item is active
	 * @param item: any
	 */
	isMenuRootItemIsActive(item): boolean {
		let result: boolean = false;

		for (const subItem of item.submenu) {
			result = this.isMenuItemIsActive(subItem);
			if (result) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseEnter(e: Event) {
		// check if the left aside menu is fixed
		if (document.body.classList.contains("kt-aside--fixed")) {
			if (this.outsideTm) {
				clearTimeout(this.outsideTm);
				this.outsideTm = null;
			}

			this.insideTm = setTimeout(() => {
				// if the left aside menu is minimized
				if (
					document.body.classList.contains("kt-aside--minimize") &&
					KTUtil.isInResponsiveRange("desktop")
				) {
					// show the left aside menu
					this.render.removeClass(
						document.body,
						"kt-aside--minimize"
					);
					this.render.addClass(
						document.body,
						"kt-aside--minimize-hover"
					);
				}
			}, 50);
		}
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseLeave(e: Event) {
		if (document.body.classList.contains("kt-aside--fixed")) {
			if (this.insideTm) {
				clearTimeout(this.insideTm);
				this.insideTm = null;
			}

			this.outsideTm = setTimeout(() => {
				// if the left aside menu is expand
				if (
					document.body.classList.contains(
						"kt-aside--minimize-hover"
					) &&
					KTUtil.isInResponsiveRange("desktop")
				) {
					// hide back the left aside menu
					this.render.removeClass(
						document.body,
						"kt-aside--minimize-hover"
					);
					this.render.addClass(document.body, "kt-aside--minimize");
				}
			}, 100);
		}
	}

	/**
	 * Returns Submenu CSS Class Name
	 * @param item: any
	 */
	getItemCssClasses(item) {
		let classes = "kt-menu__item";

		if (objectPath.get(item, "submenu")) {
			classes += " kt-menu__item--submenu";
		}

		if (!item.submenu && this.isMenuItemIsActive(item)) {
			classes += " kt-menu__item--active kt-menu__item--here";
		}

		if (item.submenu && this.isMenuItemIsActive(item)) {
			classes += " kt-menu__item--open kt-menu__item--here";
		}

		// custom class for menu item
		const customClass = objectPath.get(item, "custom-class");
		if (customClass) {
			classes += " " + customClass;
		}

		if (objectPath.get(item, "icon-only")) {
			classes += " kt-menu__item--icon-only";
		}

		if (item.mijnMenuPlus && !this.mijnMenuPlus) {
			classes += " disabled";
		}

		return classes;
	}

	getItemAttrSubmenuToggle(item) {
		let toggle = "hover";
		if (objectPath.get(item, "toggle") === "click") {
			toggle = "click";
		} else if (objectPath.get(item, "submenu.type") === "tabs") {
			toggle = "tabs";
		} else {
			// submenu toggle default to 'hover'
		}

		return toggle;
	}
}
