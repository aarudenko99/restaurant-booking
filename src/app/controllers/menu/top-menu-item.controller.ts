import { Injector } from "@angular/core";
import { MenuController } from "./menu.controller";
import { TopMenuItems } from "../../common/models/top-menu-items";

export abstract class TopMenuItemController extends MenuController {
	loading: boolean;
	SelectedRestaurant: any;
	topMenuItems: TopMenuItems;

	constructor(injector: Injector) {
		super(injector);
	}

	getTopMenuItems(restaurantId: string): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			this.loading = true;
			if (restaurantId) {
				// Helpers.setLoading(true);
				this.menuService.getTopMenuItems(restaurantId).subscribe(
					data => {
						this.topMenuItems = data.data;
						this.loading = false;
						resolve(this.topMenuItems);
						// Helpers.setLoading(false);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}
}
