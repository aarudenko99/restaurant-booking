// Angular
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	Injector
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// RxJS
import { filter } from "rxjs/operators";
// Object-Path
import * as objectPath from "object-path";
// Layout
import {
	LayoutConfigService,
	MenuConfigService,
	MenuHorizontalService,
	MenuOptions,
	OffcanvasOptions
} from "../../../../../core/_base/layout";
// HTML Class
import { HtmlClassService } from "../../html-class.service";
import { RestaurantService } from "../../../../../services/restaurant.service";
import { AuthService } from "../../../../../core/auth";
import { Restaurant } from "../../../../../common/models/restaurant";
import { AbstractController } from "../../../../../controllers/abstract/abstract.controller";

@Component({
	selector: "kt-menu-horizontal",
	templateUrl: "./menu-horizontal.component.html",
	styleUrls: ["./menu-horizontal.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent extends AbstractController
	implements OnInit, AfterViewInit {
	// Public properties
	currentRouteUrl: any = "";
	restaurants: Array<Restaurant>;
	restaurantQty: number;
	selectedRestaurant: any;

	rootArrowEnabled: boolean;

	menuOptions: MenuOptions = {
		submenu: {
			desktop: "dropdown",
			tablet: "accordion",
			mobile: "accordion"
		},
		accordion: {
			slideSpeed: 200, // accordion toggle slide speed in milliseconds
			expandAll: false // allow having multiple expanded accordions in the menu
		}
	};

	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: "kt-header-menu-wrapper",
		closeBy: "kt_header_menu_mobile_close_btn",
		toggleBy: {
			target: "kt_header_mobile_toggler",
			state: "kt-header-mobile__toolbar-toggler--active"
		}
	};

	/**
	 * Component Conctructor
	 *
	 * @param el: ElementRef
	 * @param htmlClassService: HtmlClassService
	 * @param menuHorService: MenuHorService
	 * @param menuConfigService: MenuConfigService
	 * @param layoutConfigService: LayouConfigService
	 * @param router: Router
	 * @param render: Renderer2
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(
		injector: Injector,
		private el: ElementRef,
		private router: Router,
		private render: Renderer2,
		private cdr: ChangeDetectorRef,
		public htmlClassService: HtmlClassService,
		public menuHorService: MenuHorizontalService,
		private layoutConfigService: LayoutConfigService
	) {
		super(injector);
		this.restaurantService.restaurants.subscribe(restaurants => {
			const allRestaurants = restaurants.length
				? restaurants
				: JSON.parse(localStorage.getItem("AllRestaurants"));

			console.log("ALL RESTAURANTS", allRestaurants, restaurants);

			if (allRestaurants && allRestaurants.length) {
				this.restaurants = allRestaurants;
				this.createMyRestaurantsMenuItem$(allRestaurants);
			} else {
				this.loadRestaurants();
			}
		});
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {}

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.rootArrowEnabled = this.layoutConfigService.getConfig(
			"header.menu.self.root-arrow"
		);

		this.currentRouteUrl = this.router.url;
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
				this.cdr.markForCheck();
			});
	}

	clickHandler(item) {
		if (item.event === "selectRestaurant") {
			this.selectRestaurant(item);
		} else if (item.event === "addRestaurant") {
			this.router.navigateByUrl("dashboard/create-restaurant");
		}
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseEnter(e: Event) {
		// check if the left aside menu is fixed
		if (!document.body.classList.contains("kt-menu__item--hover")) {
			this.render.addClass(document.body, "kt-menu__item--hover");
		}
	}

	/**
	 * Mouse Leave event
	 * @param event: MouseEvent
	 */
	mouseLeave(event: MouseEvent) {
		this.render.removeClass(event.target, "kt-menu__item--hover");
	}

	/**
	 * Return Css Class Name
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

		if (objectPath.get(item, "resizer")) {
			classes += " kt-menu__item--resize";
		}

		const menuType = objectPath.get(item, "submenu.type") || "classic";
		if (
			(objectPath.get(item, "root") && menuType === "classic") ||
			parseInt(objectPath.get(item, "submenu.width"), 10) > 0
		) {
			classes += " kt-menu__item--rel";
		}

		const customClass = objectPath.get(item, "custom-class");
		if (customClass) {
			classes += " " + customClass;
		}

		if (objectPath.get(item, "icon-only")) {
			classes += " kt-menu__item--icon-only";
		}

		return classes;
	}

	/**
	 * Returns Attribute SubMenu Toggle
	 * @param item: any
	 */
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

	/**
	 * Returns Submenu CSS Class Name
	 * @param item: any
	 */
	getItemMenuSubmenuClass(item) {
		let classes = "";

		const alignment = objectPath.get(item, "alignment") || "right";

		if (alignment) {
			classes += " kt-menu__submenu--" + alignment;
		}

		const type = objectPath.get(item, "type") || "classic";
		if (type === "classic") {
			classes += " kt-menu__submenu--classic";
		}
		if (type === "tabs") {
			classes += " kt-menu__submenu--tabs";
		}
		if (type === "mega") {
			if (objectPath.get(item, "width")) {
				classes += " kt-menu__submenu--fixed";
			}
		}

		if (objectPath.get(item, "pull")) {
			classes += " kt-menu__submenu--pull";
		}

		return classes;
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

		if (item.page === "create-restaurant") {
			return this.currentRouteUrl.indexOf(item.id) !== -1;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}

	/**
	 * Check Menu Root Item is active
	 * @param item: any
	 */
	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (item.submenu.columns) {
			for (const subItem of item.submenu.columns) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (typeof item.submenu[Symbol.iterator] === "function") {
			for (const subItem of item.submenu) {
				const active = this.isMenuItemIsActive(subItem);
				if (active) {
					return true;
				}
			}
		}

		return false;
	}

	selectRestaurant(item) {
		this.auth.selectedRestaurantId.next(item.id);
		this.auth.selectedRestaurantName.next(item.name);
		const index = this.restaurants.findIndex(
			e => e["Restaurant"]._id === item.id
		);
		this.selectedRestaurant = this.restaurants[index];
		localStorage.setItem(
			"SelectedRestaurant",
			JSON.stringify(this.selectedRestaurant)
		);

		this.auth.selectedRestaurant.next(this.selectedRestaurant);

		localStorage.setItem("SelectedRestaurantId", JSON.stringify(item.id));
		this.createMyRestaurantsMenuItem$(this.restaurants);

		const route = this.router.url;

		if (route.includes("user-management")) {
			this.router.navigateByUrl(
				"/dashboard/home/user-management/" + item.id + "/users"
			);
		}
	}

	createMyRestaurantsMenuItem$(restaurants: Array<Restaurant>) {
		if (!this.auth.getRestaurant()) {
			return;
		}

		const restaurantName = this.auth.getRestaurant().Restaurant.Name;

		const myRestaurantMenuItem = {
			title: `My Restaurants - (${restaurantName})`,
			root: true,
			url: "/assets/media/icons/svg/Cooking/Knife&fork.svg",
			page: "my-restaurants",
			role: "admin&manager",
			showAll: true,
			showWaiter: false,
			submenu: []
		};
		restaurants.map(restaurant => {
			myRestaurantMenuItem.submenu.push({
				title: restaurant["Restaurant"].Name,
				submenu: [
					{
						show: true,
						title: "Select",
						id: restaurant["Restaurant"]._id,
						name: restaurant["Restaurant"].Name,
						icon: "fa fa-check-square",
						event: "selectRestaurant"
					},
					{
						show: true,
						root: true,
						title: "Show",
						bullet: "dot",
						icon: "fa fa-store",
						role: "admin&manager",
						showWaiter: false,
						page: "view-restaurant/" + restaurant["Restaurant"]._id
					},
					{
						show: true,
						root: true,
						title: "Edit",
						bullet: "dot",
						icon: "fa fa-pen",
						role: "admin&manager",
						showWaiter: false,
						page: "create-restaurant",
						id: restaurant["Restaurant"]._id
					},
					{
						show: !restaurant["Restaurant"].MijnMenuPlus,
						title: "Activate Mijn Menu Plus",
						icon: "fa fa-concierge-bell"
					}
				]
			});
		});
		const index = this.menuHorService.menuList$.value.findIndex(
			e => e.page === "my-restaurants"
		);
		this.menuHorService.menuList$.value[index] = myRestaurantMenuItem;

		if (index < 0) {
			this.menuHorService.menuList$.value.splice(
				1,
				0,
				myRestaurantMenuItem
			);
			this.cdr.detectChanges();
		} else {
			this.menuHorService.menuList$.value[index] = myRestaurantMenuItem;
			this.cdr.detectChanges();
		}
	}
}
