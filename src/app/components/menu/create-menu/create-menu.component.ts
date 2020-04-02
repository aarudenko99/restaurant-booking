import { Component, OnInit, Injector, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MenuService } from "../../../services/menu.service";
import { CreateCategoryDialogComponent } from "../../dialogs/create-category-dialog/create-category-dialog.component";
import { MenuController } from "../../../controllers/menu/menu.controller";
import { MenuCategory } from "../../../common/models/menu/menu-category";

@Component({
	selector: "mm-create-menu",
	templateUrl: "./create-menu.component.html",
	styleUrls: ["./create-menu.component.scss"]
})
export class CreateMenuComponent extends MenuController implements OnInit {
	constructor(
		injector: Injector,
		public dialog: MatDialog,
		public menuService: MenuService
	) {
		super(injector);
	}

	ngOnInit() {
		this.auth.selectedRestaurantId.subscribe(SelectedRestaurantId => {
			console.log(SelectedRestaurantId);

			const restaurantId = SelectedRestaurantId
				? SelectedRestaurantId
				: this.auth.getRestaurantId();

			this.SelectedRestaurantId = restaurantId;
			this.loadMenuData().then(response => {
				this.menuService.storeMenu(this.Menu);
				console.log(this.Menu);

				this.selected.setValue(0);
				this.Menu["selectedindex"] = 0;
				console.log(this.Menu);
				this.cd.detectChanges();
			});
		});
	}

	revertMenu() {
		this.Menu = this.menuService.getStoredMenu();
		console.log(this.Menu);
		this.Menu.forEach(element => {
			if (element.edit) {
				delete element.edit;
				this.menuService.updateMenuCategory(element).subscribe(data => {
					this.setMenuItems();
				});
			}
			if (element.deleted) {
				delete element.deleted;
				this.menuService.addMenuCategory(element).subscribe(data => {
					this.setMenuItems();
				});
			}
		});
		this.menuService.menuChanged.next(false);
	}

	openAddCategoryDialog(categories?: Array<MenuCategory>): void {
		console.log(categories);
		const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
			// width: '50%',
			panelClass: "category-dialog",
			data: { categories: categories ? categories : null }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (!result) {
				return;
			}
			if (!result.edit) {
				const index =
					result.Type === "Food"
						? this.menuService.foodItems.value
						: this.menuService.drinks.value;
				console.log("INDEX", index, result);

				this.addMenuCategory(result);
				this.selected.setValue(index.length);
				console.log("INDEX", this.selected.value);
			} else if (result.edit) {
				this.updateCategories(result);
			}
		});
	}

	removeTab(index: number) {
		this.Menu.splice(index, 1);
	}
}
