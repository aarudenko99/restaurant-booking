import { AuthService } from "./../../core/auth";
import { Injector, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { AbstractController } from "../abstract/abstract.controller";
import { MatPaginator } from "@angular/material";
import { LayoutUtilsService, MessageType } from "../../core/_base/crud";
import { FormControl } from "@angular/forms";

// Model
import { MenuCategory } from "../../common/models/menu/menu-category";

export abstract class MenuController extends AbstractController {
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	selected = new FormControl(0);
	loading: boolean;
	parentView: string;
	SelectedRestaurant: any;
	Menu: Array<MenuCategory>;
	auth: AuthService;
	selectedType: string;
	selectedIndex: number;
	categories: Array<MenuCategory>;
	subCategories: Array<any>;

	paginatorLength: number;
	cd: ChangeDetectorRef;
	menuService: MenuService;
	layoutUtilsService: LayoutUtilsService;

	constructor(injector: Injector) {
		super(injector);
		this.cd = this.injector.get(ChangeDetectorRef);
		this.menuService = this.injector.get(MenuService);
		this.layoutUtilsService = this.injector.get(LayoutUtilsService);
		this.auth = this.injector.get(AuthService);
		this.selectedType = "Food";
	}

	// setDataSource(dSource) {
	//     this.dataSource = new MatTableDataSource(dSource);
	//     this.dataSource.paginator = this.paginator;
	//     console.log(this.dataSource);
	// }

	loadMenuData(): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			this.loading = true;
			console.log(this.SelectedRestaurantId);

			if (this.SelectedRestaurantId) {
				// Helpers.setLoading(true);
				this.menuService
					.getMenuOfRestaurant(this.SelectedRestaurantId)
					.subscribe(
						data => {
							this.Menu = data.data as MenuCategory[];
							this.menuService.Menu = this.Menu;
							console.log(data.data);
							this.setMenuItems();
							console.log(this.menuService.drinks.value);
							this.loading = false;
							console.log(
								"LOAD MENU DATAT LOADING!!!!!!!",
								this.loading
							);

							resolve(data.data);
							// Helpers.setLoading(false);
						},
						error => {
							// Helpers.setLoading(false);
							console.log("ERROR");
						}
					);
			}
		});
		return promise;
	}

	setMenuItems() {
		const foodItems = [];
		const drinks = [];
		this.Menu.map(menu => {
			if (menu.Type === "Food") {
				foodItems.push(menu);
			} else if (menu.Type === "Drinks") {
				drinks.push(menu);
			}
		});
		this.menuService.foodItems.next(foodItems);
		this.menuService.drinks.next(drinks);
		this.cd.detectChanges();
	}

	addMenuCategory(category: MenuCategory) {
		if (this.SelectedRestaurantId) {
			category.RestaurantId = this.SelectedRestaurantId;
			console.log("category", category, this.Menu);
			category.index = this.Menu.length + 1;
			this.menuService.addMenuCategory(category).subscribe(
				data => {
					let foodItems = [];
					let drinks = [];
					this.Menu = [...this.Menu, ...data.data];
					if (data.data.Type === "Food") {
						foodItems = [
							...this.menuService.foodItems.value,
							...data.data
						];
						this.menuService.foodItems.next(foodItems);
						this.Menu["selectedindex"] = foodItems.length - 1;
					} else if (data.data.Type === "Drinks") {
						drinks = [
							...this.menuService.drinks.value,
							...data.data
						];
						this.menuService.drinks.next(drinks);
						this.Menu["selectedindex"] = drinks.length - 1;
					}
					this.menuService.storeMenu(this.Menu);
					this.auth
						.updateSetupProgress({
                            RestaurantId: this.auth.getRestaurantId(),
                            updateType: 'MenuSetup'
						})
						.subscribe();
					this.loading = false;
					this.cd.detectChanges();
					console.log(this.Menu);
				},
				error => {
					// Helpers.setLoading(false);
				}
			);
		}
	}

	typeChange(typeIndex: number) {
		if (typeIndex === 0) {
			this.selectedType = "Food";
		} else {
			this.selectedType = "Drinks";
		}
	}

	tabChange(selectedIndex: number) {
		// this.selected.setValue(selectedIndex);
		this.selectedIndex = selectedIndex;
		console.log(this.categories);
		console.log(this.selected.value, selectedIndex);
	}

	updateCategories(category: MenuCategory) {
		console.log("UPDATE CATEGORY", category);
		this.menuService.updateMenuCategory(category).subscribe(
			data => {
				console.log(data.data, this.Menu);
				if (data.data.Type === "Food") {
					const foodItems = this.menuService.foodItems.value;
					const index = foodItems.findIndex(
						foodCat => foodCat._id === category._id
					);
					foodItems[index] = data.data;
					this.menuService.foodItems.next(foodItems);
				} else {
					const drinkItems = this.menuService.drinks.value;
					const index = drinkItems.findIndex(
						drinkCat => drinkCat._id === category._id
					);
					drinkItems[index] = data.data;
					this.menuService.drinks.next(drinkItems);
				}
				this.cd.detectChanges();
				this.layoutUtilsService.showActionNotification(
					"Category has been updated",
					MessageType.Update
				);
				this.menuService.menuChanged.next(true);
			},
			error => {
				// Helpers.setLoading(false);
			}
		);
	}

	deleteMainCategory(categoryId: string) {
		// this.categories[index].edit = this.edit;
		console.log(categoryId);
		this.deleteCategory("deleteMenuCategory", categoryId);
	}

	deleteSubCategory(categoryId: string, subCategoryId: string) {
		console.log(subCategoryId);
		const index = this.categories.findIndex(cat => cat._id === categoryId);
		this.deleteCategory("deleteMenuSubCategory", subCategoryId, index);
	}

	/** ACTIONS */
	/**
	 * Delete category
	 *
	 * @param _item: Category
	 */
	deleteCategory(method: string, id: string, index?: number) {
		const _title = "Menu Category";
		const _description =
			"Are you sure to permanently delete this category?";
		const _waitDesciption = "Category is deleting...";
		const _deleteMessage = `Category has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);

		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.menuService[method](id).subscribe(
				data => {
					this.layoutUtilsService.showActionNotification(
						_deleteMessage,
						MessageType.Delete
					);
					let menuItems;
					let itemIndex: number;

					if (method === "deleteMenuCategory") {
						if (this.selectedType === "Food") {
							menuItems = this.menuService.foodItems.value;
							itemIndex = menuItems.findIndex(
								category => category._id === id
							);
						} else {
							menuItems = this.menuService.drinks.value;
							itemIndex = menuItems.findIndex(
								category => category._id === id
							);
						}
						menuItems[itemIndex].deleted = true;
						this.menuService.setMenuValue(menuItems[itemIndex]);
						menuItems.splice(itemIndex, 1);
					} else {
						const subCatIndex = this.categories[
							index
						].SubCategories.findIndex(subCat => subCat._id === id);

						this.categories[index].SubCategories.splice(
							subCatIndex,
							1
						);
					}
					this.menuService.menuChanged.next(true);
					// this.menuService.setMenuValue(
					// 	menuItems[itemIndex],
					// 	'delete'
					// );
					this.cd.detectChanges();
				},
				error => {
					this.layoutUtilsService.showActionNotification(
						error.message,
						MessageType.Delete
					);
				}
			);
		});
	}
}
