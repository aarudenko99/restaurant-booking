import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Bill } from "../../common/models/bill/bill";
import { BillService } from "../../services/bill.service";
import { AuthService } from "../../core/auth";

@Component({
	selector: "mm-bill",
	templateUrl: "./bill.component.html",
	styleUrls: ["./bill.component.scss"]
})
export class BillComponent implements OnInit {
	@Input() bill: Bill;
	@Input() show?: boolean;
	@Output() updateBillStatus = new EventEmitter<Bill>();
	@Output() editBill = new EventEmitter<boolean>();
	SelectedRestaurantId: string;
	orderMenuItems: Array<any> = [
		{
			icon: "flaticon2-check-mark",
			text: "Paid"
		},
		{
			icon: "fa fa-pencil-alt",
			text: "Edit"
		}
	];
	// displayedColumns = ['Quantity', 'ProductName', 'ProductPrice', 'Price'];
	// dataSource: MatTableDataSource<UserOrders>;

	constructor(private auth: AuthService, private billService: BillService) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.SelectedRestaurantId = restaurantId;
		});
	}

	ngOnInit() {
		// console.log(this.bill, this.show);
		// this.dataSource = new MatTableDataSource(this.bill.Orders);
	}

	changeStatus(bill, event) {
		console.log(bill, event);
		console.log(this.SelectedRestaurantId);
		if (event === "Paid") {
			this.billService
				.updateBillStatus(
					bill.ReservationCode,
					this.SelectedRestaurantId
				)
				.subscribe(response => {
					this.updateBillStatus.emit(response["Billing"]);
				});
		}
	}
}
