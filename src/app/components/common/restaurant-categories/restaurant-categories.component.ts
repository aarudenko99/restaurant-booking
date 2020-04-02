import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	ChangeDetectorRef
} from "@angular/core";
import { RestaurantCategory } from "../../../common/models/restaurant-category";
import { RestaurantCategoryService } from "../../../services/restaurant-category.service";
import { WizardService } from "../../../services/wizard.service";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AddRestaurantCategoryComponent } from "../../dialogs/add-restaurant-category/add-restaurant-category.component";

@Component({
	selector: "mm-restaurant-categories",
	templateUrl: "./restaurant-categories.component.html",
	styleUrls: ["./restaurant-categories.component.scss"]
})
export class RestaurantCategoriesComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() validationMessages: any;
	@Output() categorySelected = new EventEmitter<string>();
	@Output() validateForm = new EventEmitter<any>();
	restaurantCategories: Array<RestaurantCategory>;

	constructor(
		public restaurantCategoryService: RestaurantCategoryService,
		public wizardService: WizardService,
		public cd: ChangeDetectorRef,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		console.log(
			"restaurant-categories!!!!!!!!!!!!",
			this.wizardService.formData
		);

		this.loadRestaurantCategories();
	}

	loadRestaurantCategories() {
		this.restaurantCategoryService.getAllRestaurantCategory().subscribe(
			data => {
				this.restaurantCategories = data.data;
				console.log(this.restaurantCategories);
				this.wizardService.restaurantCategories = this.restaurantCategories;
				this.cd.detectChanges();
				// Helpers.setLoading(false);
			},
			error => {
				// Helpers.setLoading(false);
			}
		);
	}

	changed(e: any): void {
		if (e.value === "add_category") {
			console.log("redirect it");

			const dialogRef = this.dialog.open(AddRestaurantCategoryComponent, {
				width: "50%",
				data: {}
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					console.log("The dialog was closed", result);
					// const deleteMessage = `You have edited the reservation of ${reservation.FullName}`;
					// this.layoutUtilsService.showActionNotification(
					// 	deleteMessage,
					// 	MessageType.Delete
					// );
				}
			});
		}
		if (e.value !== "add_category" && e.value !== 0) {
			this.form.controls["category"].setValue(e.value);
			this.validateForm.emit(this.form);
			// this.wizardService.form.controls.category.setErrors(null);
			this.categorySelected.emit(e.value);
			// this.restaurant.RestaurantCategoryId = e.value;
		}
	}
}
