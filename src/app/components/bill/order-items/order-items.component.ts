import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "../../../common/models/bill/bill";
import { UserOrders } from "../../../common/models/bill/user-orders";
import { MenuItem } from "../../../common/models/menu/menu-item";

@Component({
	selector: "mm-order-items",
	templateUrl: "./order-items.component.html",
	styleUrls: ["./order-items.component.scss"]
})
export class OrderItemsComponent implements OnInit {
	@Input() bill: Bill;
	@Input() show?: boolean;
	@Input() userOrders: UserOrders;
	foodItems: MenuItem[] = [];
	drinkItems: MenuItem[] = [];

	constructor() {}

	ngOnInit() {
		if (this.userOrders.Items.length > 0) {
			this.foodItems = this.userOrders.Items[0].FoodItems;
			this.drinkItems = this.userOrders.Items[1].Drinks;
		}
	}
}
