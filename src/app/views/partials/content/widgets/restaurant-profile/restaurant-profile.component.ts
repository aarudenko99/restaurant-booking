import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	Injector
} from "@angular/core";
import { AbstractController } from "../../../../../controllers/abstract/abstract.controller";
import { UserService } from "../../../../../services/user.service";
import { User } from "../../../../../core/auth";
import { RestaurantService } from "../../../../../services/restaurant.service";
import { Restaurant } from "../../../../../common/models/restaurant";
import {
	MessageType,
	LayoutUtilsService
} from "../../../../../core/_base/crud";

@Component({
	selector: "mm-restaurant-profile",
	templateUrl: "./restaurant-profile.component.html",
	styleUrls: ["./restaurant-profile.component.scss"]
})
export class RestaurantProfileComponent implements OnInit {
	selectedRestaurant: any;
	@Input() read: boolean;
	@Input() restaurant: any;
	@Output() refresh = new EventEmitter();
	@Output() _selectRestaurant = new EventEmitter();

	restaurantUsers: Array<User>;

	menuItems = [
		{
			icon: "flaticon2-graph",
			text: "daily"
		},
		{
			icon: "flaticon2-graph",
			text: "weekly"
		},
		{
			icon: "flaticon2-graph",
			text: "monthly"
		}
	];

	constructor(
		private userService: UserService,
		private restaurantService: RestaurantService,
		private layoutUtilsService: LayoutUtilsService
	) {
		this.selectedRestaurant = this.restaurantService.selectedRestaurant;
	}

	ngOnInit() {
		const userQty = "5";
		// TO DO CHANGE THIS TO DYNAMIC RESTAURANT USERS. (STORE RESTAURANT USERS IN RESTAURANT MODEL);
		// console.log(this.restaurant);

		this.userService
			.getNewUsers(this.selectedRestaurant.Restaurant._id, userQty)
			.subscribe(restaurantUsers => {
				if (restaurantUsers) {
					this.restaurantUsers = restaurantUsers.data;
				}
			});
	}

	selectRestaurant(restaurant: any) {
		this._selectRestaurant.emit(restaurant);
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
						// Helpers.setLoading(false);
						// this.loadMenuData();
						console.log(data);
						const deleteMessage = `You have deleted ${restaurant.Name}`;
						this.layoutUtilsService.showActionNotification(
							deleteMessage,
							MessageType.Delete
						);
						this.refresh.emit();
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
	}
}
