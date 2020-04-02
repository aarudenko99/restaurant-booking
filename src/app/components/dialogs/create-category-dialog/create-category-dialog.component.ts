import { Component, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuCategory } from '../../../common/models/menu/menu-category';
import { MenuController } from '../../../controllers/menu/menu.controller';

@Component({
	selector: 'mm-create-category-dialog',
	templateUrl: './create-category-dialog.component.html',
	styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent extends MenuController {
	editCategory: boolean;
	edit: boolean;
	menuCategory: MenuCategory = new MenuCategory();
	activeCategory: MenuCategory;

	constructor(
		injector: Injector,
		public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		super(injector);
		this.categories = [];
		if (!!this.data.categories) {
			console.log(
				'THIS DATA',
				this.selectedIndex,
				this.data,
				this.categories
			);
			this.edit = true;
			this.categories = this.data.categories;
			this.selectedIndex = this.categories.findIndex(
				category =>
					category._id ===
					this.data.categories[this.data.categories.selectedindex]._id
			);
		} else {
			this.menuCategory.Type = 'Food';
			this.edit = false;
		}
	}

	// categorySelect(category: MenuCategory) {
	// 	this.selectedIndex = this.categories.findIndex(
	// 		cat => cat._id === category._id
	// 	);
	// 	console.log(this.selectedIndex);
	// }

	addCategories() {
		this.menuCategory.SubCategories = this.subCategories;
		console.log('ADD CATEGORY', this.subCategories);

		this.menuCategory.edit = this.edit;
		this.dialogRef.close(this.menuCategory);
		this.menuService.menuChanged.next(true);
	}

	addSubCategory() {
		console.log('Check');

		this.subCategories.push({ SubCategoryName: '' });
	}

	deleteSubCat(index: number) {
		this.subCategories.splice(index, 1);
	}

	updateCategory() {
		let index: number;
		if (this.selectedType === 'Food') {
			index = this.categories.findIndex(
				item =>
					item._id ===
					this.menuService.foodItems.value[this.selectedIndex]._id
			);
		} else {
			index = this.categories.findIndex(
				item =>
					item._id ===
					this.menuService.drinks.value[this.selectedIndex]._id
			);
		}
		this.categories[index].edit = this.edit;
		this.menuService.setMenuValue(this.categories[index]);
		this.dialogRef.close(this.categories[index]);
	}
}
