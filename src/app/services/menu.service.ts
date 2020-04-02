import { Injectable } from "@angular/core";
import { AppSettings } from "../app.settings";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { AbstractService } from "./abstract.service";
import { map } from "rxjs/operators";
// RxJS
import { Observable, BehaviorSubject } from "rxjs";

// Models
import { MenuItem } from "../common/models/menu/menu-item";
import { MenuCategory } from "../common/models/menu/menu-category";
import { SideDish } from "../common/models/menu/side-dish";

@Injectable({
	providedIn: "root"
})
export class MenuService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;
	Menu: Array<MenuCategory>;
	state = {
		loading: null
	};
	public menuChanged = new BehaviorSubject<boolean>(false);
	public foodItems = new BehaviorSubject<Array<MenuCategory>>(
		new Array<MenuCategory>()
	);
	public drinks = new BehaviorSubject<Array<MenuCategory>>(
		new Array<MenuCategory>()
	);

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	setMenuValue(item) {
		const categories = this.getStoredMenu();
		const index = categories.findIndex(x => x._id === item._id);
		if (!!categories && index !== -1) {
			if (item.edit) {
				categories[index].edit = true;
			}
			if (item.deleted) {
				categories[index].deleted = true;
			}
			this.storeMenu(categories);
		}
	}

	getAllMenus() {
		return this.http
			.get(this.apiURL + "/api/menu", { headers: this.getHeaders() })
			.pipe(map((response: any) => response));
	}

	getMenuOfRestaurant(restaurantId: string): Observable<any> {
		return this.http
			.get(this.apiURL + "/api/menu/" + restaurantId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu Category
	 * @params category
	 *
	 * */
	addMenuCategory(category: MenuCategory) {
		return this.http
			.post(this.apiURL + "/api/menu", category, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	updateMenuCategory(category: MenuCategory) {
		return this.http
			.put(this.apiURL + "/api/menu", category, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteMenuCategory(categoryId: string) {
		return this.http
			.delete(this.apiURL + "/api/menu/" + categoryId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu SubCategory
	 * @params categoryId
	 *
	 * */
	addMenuSubCategory(categoryId: string, subCategory: any) {
		return this.http
			.post(
				this.apiURL + "/api/menu/" + categoryId + "/subcategory",
				subCategory,
				{
					headers: this.getHeaders()
				}
			)
			.pipe(map((response: any) => response));
	}

	deleteMenuSubCategory(categoryId: string) {
		return this.http
			.delete(this.apiURL + "/api/menu/subcategory/" + categoryId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu Item
	 * @params menuItem
	 *
	 * */
	updateMenuItem(menuItem: MenuItem) {
		return this.http
			.put(this.apiURL + "/api/menu/item/" + menuItem._id, menuItem, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	addMenuItem(menuCategoryId: string, menuItem: MenuItem) {
		return this.http
			.post(
				this.apiURL + "/api/menu/" + menuCategoryId + "/item",
				menuItem,
				{ headers: this.getHeaders() }
			)
			.pipe(map((response: any) => response));
	}

	deleteMenuItem(id: any) {
		return this.http
			.delete(this.apiURL + "/api/menu/item/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu Item Image
	 * @params files
	 *
	 * */
	postFile(fileToUpload: FormData, id: any) {
		return this.http
			.post(
				this.apiURL + "/api/upload/Menu/" + id + "/image",
				fileToUpload
			)
			.pipe(map((response: any) => response));
	}

	getImages(id: any) {
		return this.http
			.get(this.apiURL + "/api/images/" + id + "/Menu", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	deleteImage(id: any) {
		return this.http
			.delete(this.apiURL + "/api/image/" + id, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu Additional Items
	 * @params
	 *
	 * */
	getAllDietaryType() {
		return this.http
			.get(this.apiURL + "/api/dietaryRestrictions", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getAllergicType() {
		return this.http
			.get(this.apiURL + "/api/allergicTypes", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	getSideDishes(restaurantId: string) {
		return this.http
			.get(this.apiURL + "/api/menu/sideDishes/" + restaurantId, {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	addSideDish(sideDish: SideDish) {
		return this.http
			.post(this.apiURL + "/api/menu/sideDishes", sideDish)
			.pipe(map((response: any) => response));
	}

	/*
	 * Top Menu Items
	 * @params id
	 *
	 * */
	getTopMenuItems(id: string) {
		return this.http
			.get(this.apiURL + "/api/restaurants/" + id + "/topOrders", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}

	/*
	 * Menu Performance
	 * @params id & criteria: daily, weekly, monthly
	 *
	 * */
	getMenuPerformance(id: string, criteria: string, filter?: string) {
		let params;

		if (filter) {
			params = new HttpParams().set("filter", filter);
		}
		return this.http
			.get(
				this.apiURL +
					"/api/restaurants/" +
					id +
					"/menuPerfomance/" +
					criteria,
				{ headers: this.getHeaders(), params: params }
			)
			.pipe(map((response: any) => response));
	}

	storeMenu(data) {
		localStorage.setItem("stored-menu", JSON.stringify(data));
	}

	getStoredMenu() {
		return JSON.parse(localStorage.getItem("stored-menu"));
	}
}
