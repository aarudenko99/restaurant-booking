import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LayoutConfigService } from "../../../core/_base/layout";
import { OrderStatisticsService } from "../../../services/order-statistics.service";
import { OrderStats } from "../../../common/models/orders/orderStats";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "mm-order-quantity",
	templateUrl: "./order-quantity.component.html",
	styleUrls: ["./order-quantity.component.scss"]
})
export class OrderQuantityComponent implements OnInit {
	activeOrders: number;
	averageOrders: number;
	orderStats: OrderStats;
	graphData: any = {};
	showDateFilter: boolean = false;
	selectedFilter: any = "monthly";
	restaurantId: string;

	filters = [
		{
			icon: "fa fa-calendar-week",
			text: "daily"
		},
		{
			icon: "fa fa-calendar-week",
			text: "weekly"
		},
		{
			icon: "flaticon2-calendar-7",
			text: "monthly"
		},
		{
			icon: "flaticon2-calendar-8",
			text: "yearly"
		}
	];

	constructor(
		private cdRef: ChangeDetectorRef,
		private auth: AuthService,
		private layoutConfigService: LayoutConfigService,
		private orderStatsService: OrderStatisticsService
	) {}

	ngOnInit() {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.restaurantId = id;
				this.setGraphData(this.selectedFilter);
			}
		});
	}

	filerBySelection(selection) {
		this.selectedFilter = selection.text;
		if (selection.text === "daily" || selection.text === "weekly") {
			this.showDateFilter = true;
		} else {
			this.showDateFilter = false;
		}
		this.setGraphData(selection.text);
	}

	setGraphData(criteria: string, filter?: string) {
		this.graphData = null;
		const color = Chart.helpers.color;
		this.orderStatsService
			.getOrderStats(this.restaurantId, criteria, filter)
			.subscribe(
				orderStats => {
					this.activeOrders = orderStats.data.Active;
					this.averageOrders =
						Math.round(orderStats.data.Average * 10) / 10;

					this.graphData = {
						labels: orderStats.data.Labels,
						datasets: [
							{
								fill: true,
								fillColor: "rgba(220,220,220,0)",
								backgroundColor: color(
									this.layoutConfigService.getConfig(
										"colors.state.brand"
									)
								)
									.alpha(1)
									.rgbString(),

								pointHoverRadius: 6,
								pointHoverBorderWidth: 30,
								pointBackgroundColor: Chart.helpers
									.color("#000000")
									.alpha(0)
									.rgbString(),
								pointHoverBackgroundColor: this.layoutConfigService.getConfig(
									"colors.state.brand"
								),
								data: orderStats.data.Data
							}
						]
					};

					this.cdRef.detectChanges();
				},
				error => {
					console.log(error);
				}
			);
	}

	filterGraphData(date: string) {
		console.log(date);
		this.setGraphData(this.selectedFilter, date);
	}
}
