import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { DashboardService } from "../../../services/dashboard.service";
import { AuthService } from "../../../core/auth";
import { TableService } from "../../../services/table.service";

@Component({
	selector: "mm-top-data-item",
	templateUrl: "./top-data-item.component.html",
	styleUrls: ["./top-data-item.component.scss"]
})
export class TopDataItemComponent implements OnInit {
	@Input() type?: string;
	selectedRestaurantId: string;
	cardOne;
	cardTwo;
	cardThree;
	cardFour;

	constructor(
		private dashboardService: DashboardService,
		private tableService: TableService,
		private auth: AuthService,
		private cd: ChangeDetectorRef
	) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.selectedRestaurantId = id;
				this.loadData();
			}
		});
		this.cardOne = {
			className: "green",
			title: "",
			value: "--",
			icon: ""
		};
		this.cardTwo = {
			className: "purple",
			title: "",
			value: "--",
			icon: ""
		};
		this.cardThree = {
			className: "turqoise",
			title: "",
			value: "--",
			icon: ""
		};
		this.cardFour = {
			className: "red",
			title: "",
			value: "--",
			icon: ""
		};
	}

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		const restaurantId = this.selectedRestaurantId;
		switch (this.type) {
			case "dashboard":
				this.dashboardService
					.getDashboardCardsData(restaurantId)
					.subscribe(response => {
						this.cardOne.title = "Total Sales";
						this.cardOne.value = response.data.Total_Sale;
						this.cardOne.icon =
							"./assets/media/icons/dashboard-icons/total-sales-icon.svg";

						this.cardTwo.title = "Checked-in Customers";
						this.cardTwo.value = response.data.Total_Customers;
						this.cardTwo.icon =
							"./assets/media/icons/dashboard-icons/customers-icon.svg";

						this.cardThree.title = "Completed Transaction";
						this.cardThree.value = response.data.Total_Transactions;
						this.cardThree.icon =
							"./assets/media/icons/dashboard-icons/completed-transactions-icon.svg";

						this.cardFour.title = "Revenue";
						this.cardFour.value =
							"€" + response.data.Total_Paid_Amount;
						this.cardFour.icon =
							"./assets/media/icons/dashboard-icons/profit-icon.svg";
						this.cd.detectChanges();
					});
				break;
			case "table-management":
				this.tableService
					.getTableManagementCardsData(restaurantId)
					.subscribe(response => {
						this.cardOne.title = "Total Seats";
						this.cardOne.value = response.data.Total_Seats;
						this.cardOne.icon =
							"./assets/media/icons/table-management-icons/total-seats.svg";

						this.cardTwo.title = "Reserved Seats";
						this.cardTwo.value = response.data.Reserved;
						this.cardTwo.icon =
							"./assets/media/icons/table-management-icons/reservations.svg";

						this.cardThree.title = "AdHoc Customers";
						this.cardThree.value = response.data.AdHoc_Customers;
						this.cardThree.icon =
							"./assets/media/icons/table-management-icons/adhoc-customers.svg";

						this.cardFour.title = "Free Tables";
						this.cardFour.value = response.data.Free_Tables;
						this.cd.detectChanges();
					});
				break;
		}
	}
}
