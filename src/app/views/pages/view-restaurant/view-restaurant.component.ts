import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from "../../../services/restaurant.service";
import { Restaurant } from "../../../common/models/restaurant";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";
import { MenuService } from "../../../services/menu.service";

@Component({
	selector: "mm-view-restaurant",
	templateUrl: "./view-restaurant.component.html",
	styleUrls: ["./view-restaurant.component.scss"]
})
export class ViewRestaurantComponent implements OnInit {
	restaurant: Restaurant;
	Features: Array<any>;
	DietaryTypes: Array<any>;
	TimeSlots: Array<any> = [];

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private menuService: MenuService,
		private cd: ChangeDetectorRef,
		private layoutUtilsService: LayoutUtilsService
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.restaurantService.getRestaurantById(params.id).subscribe(
				data => {
					console.log(data);

					this.restaurant = data.data[0];
					this.getAllDietaryTypes();
					this.orderTimeSlots();
					this.cd.detectChanges();
				},
				error => {}
			);
		});
	}

	orderTimeSlots() {
		if (this.TimeSlots.length) {
			return;
		}
		if (this.restaurant.TimeSlots[0]["Breakfast"]) {
			this.TimeSlots.push({
				title: "Breakfast",
				value: this.restaurant.TimeSlots[0]["Breakfast"]
			});
		}
		if (this.restaurant.TimeSlots[0]["Lunch"]) {
			this.TimeSlots.push({
				title: "Lunch",
				value: this.restaurant.TimeSlots[0]["Lunch"]
			});
		}
		if (this.restaurant.TimeSlots[0]["Dinner"]) {
			this.TimeSlots.push({
				title: "Dinner",
				value: this.restaurant.TimeSlots[0]["Dinner"]
			});
		}
	}

	getAllDietaryTypes() {
		this.menuService.getAllDietaryType().subscribe(dietaryType => {
			const res = dietaryType.data.filter(item =>
				this.restaurant.DietaryTypes.includes(item._id)
			);
			this.DietaryTypes = res;
			this.cd.detectChanges();
		});
	}

	deleteRestaurant(restaurant: Restaurant) {
		const _title: string = "Delete Restaurant";
		const _description: string = `Are you sure to permanently delete ${restaurant.Name} Restaurant?`;
		const _waitDesciption: string = "Restaurant is deleting...";

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log("The dialog was closed", result);
				this.restaurantService.delete(restaurant._id).subscribe(
					data => {
						const deleteMessage = `You have deleted ${restaurant.Name}`;
						this.layoutUtilsService.showActionNotification(
							deleteMessage,
							MessageType.Delete
						);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
	}
}
