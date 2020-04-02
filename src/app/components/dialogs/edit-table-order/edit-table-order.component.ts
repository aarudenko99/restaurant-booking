import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TableOrder } from "../../../common/models/orders/table-order";
import { LiveOrderService } from "../../../services/live-order.service";

@Component({
	selector: "mm-edit-table-order",
	templateUrl: "./edit-table-order.component.html",
	styleUrls: ["./edit-table-order.component.scss"]
})
export class EditTableOrderComponent implements OnInit {
	tableOrder: TableOrder = new TableOrder();

	constructor(
		public dialogRef: MatDialogRef<EditTableOrderComponent>,
		private liveOrderService: LiveOrderService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data) {
			this.tableOrder = data.tableOrder;
			console.log("EDIT DATA", this.tableOrder);
		}
	}

	ngOnInit() {}

	increment(item: any) {
		item.Quantity++;
	}

	decrement(item: any) {
		console.log(item);

		if (item.Quantity <= 1) {
			return;
		}
		item.Quantity--;
	}

	deleteItem(item: any) {
		console.log(item, this.tableOrder.OrderdItems.FoodItems);
		if (item.MenuType === "FoodItem") {
			const index = this.tableOrder.OrderdItems.FoodItems.findIndex(
				e => e._id === item._id
			);
			this.tableOrder.OrderdItems.FoodItems.splice(index, 1);
			console.log(index, this.tableOrder.OrderdItems.FoodItems[index]);
		} else if (item.MenuType === "Drinks") {
		}
	}

	dismissDialog(): void {
		console.log(this.tableOrder);
		this.liveOrderService
			.updateTableOrder(this.tableOrder)
			.subscribe(resp => console.log(resp));
		// this.dialogRef.close(this.tableOrder);
	}
}
