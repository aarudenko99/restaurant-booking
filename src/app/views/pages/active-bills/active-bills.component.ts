import { Component, OnInit, Injector, ChangeDetectorRef } from "@angular/core";
import { Bill } from "../../../common/models/bill/bill";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { BillService } from "../../../services/bill.service";

@Component({
	selector: "mm-active-bills",
	templateUrl: "./active-bills.component.html",
	styleUrls: ["./active-bills.component.scss"]
})
export class ActiveBillsComponent extends AbstractController implements OnInit {
	selectedState: string;
	bills: Array<Bill>;

	menuItems = [
		{
			icon: "fa fa-file-invoice-dollar",
			text: "Active",
			filter: "Unpaid"
		},
		{
			icon: "fa fa-check",
			text: "Paid",
			filter: "Paid"
		},
		{
			icon: "fa fa-exclamation",
			text: "Delayed"
		}
	];

	constructor(
		injector: Injector,
		private cd: ChangeDetectorRef,
		private billService: BillService
	) {
		super(injector);
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.SelectedRestaurantId = restaurantId;
			this.billService
				.connect(restaurantId)
				.subscribe(connected => console.log(connected));
		});
	}

	ngOnInit() {
		this.filterBills("Unpaid");
	}

	// getActiveBills() {
	// 	this.auth.selectedRestaurantId.subscribe(restaurantId => {
	// 		this.SelectedRestaurantId = restaurantId;
	// 		this.billService.connect(restaurantId).subscribe();
	// 		this.billService.getActiveBills().subscribe(response => {
	// 			this.activeBills = response.activeBills;
	// 			this.cd.detectChanges();
	// 		});
	// 	});
	// }

	filteredBills(bills: Array<Bill>) {
		this.bills = bills;
		this.cd.detectChanges();
	}

	billUpdated(bill: Bill) {
		const index = this.bills.findIndex(
			e => e.ReservationCode === bill.ReservationCode
		);
		console.log(this.bills[index]);
	}

	filterBills(filter: string) {
		this.selectedState = filter;
		filter === "Active" ? (filter = "Unpaid") : null;
		// this.showLoading();
		console.log(filter, this.SelectedRestaurantId);

		this.billService
			.filterBills(filter, this.SelectedRestaurantId)
			.subscribe(
				response => {
					console.log(response.Bills);

					this.bills = response.Bills;
					console.log(this.bills);

					// this.hideLoading();
					this.cd.detectChanges();
				},
				err => {
					this.hideLoading();
				}
			);
	}
}
