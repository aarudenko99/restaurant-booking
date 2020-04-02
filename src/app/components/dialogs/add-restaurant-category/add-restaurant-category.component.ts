import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatDialogRef } from "@angular/material";
import { RestaurantCategory } from "../../../common/models/restaurant-category";
import { RestaurantCategoryService } from "../../../services/restaurant-category.service";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";

@Component({
	selector: "mm-add-restaurant-category",
	templateUrl: "./add-restaurant-category.component.html",
	styleUrls: ["./add-restaurant-category.component.scss"]
})
export class AddRestaurantCategoryComponent implements OnInit {
	Category: RestaurantCategory = new RestaurantCategory();

	constructor(
		public dialogRef: MatDialogRef<AddRestaurantCategoryComponent>,
		private restaurantCategoryService: RestaurantCategoryService,
		private translate: TranslateService,
		private layoutUtilsService: LayoutUtilsService
	) {}

	ngOnInit() {}

	saveCategory() {
		this.restaurantCategoryService
			.add(this.Category)
			.subscribe(response => {
				if (response) {
					this.dialogRef.close();
					const updateMessage = this.translate.instant(
						"COMMON.CATEGORY_CREATED"
					);
					this.layoutUtilsService.showActionNotification(
						updateMessage,
						MessageType.Update,
						10000,
						true,
						false
					);
				}
			});
	}
}
