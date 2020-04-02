import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "../../../core/auth";
import { LayoutConfigService } from "../../../core/_base/layout";
import { OrderStatisticsService } from "../../../services/order-statistics.service";

@Component({
	selector: "mm-revenue-chart",
	templateUrl: "./revenue-chart.component.html",
	styleUrls: ["./revenue-chart.component.scss"]
})
export class RevenueChartComponent implements OnInit {
	graphData: any = {};
	selectedFilter: any = "monthly";
	restaurantId: string;
	showDateFilter: boolean = false;
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
			.getRevenueStats(this.restaurantId, criteria, filter)
			.subscribe(
				revenuStats => {
					console.log(revenuStats.data);
					this.graphData = {
						title: revenuStats.data.Title,
						labels: revenuStats.data.Labels,
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
								data: revenuStats.data.Data
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
		this.setGraphData(this.selectedFilter, date);
	}
}
