import { Component, OnInit, Injector, ChangeDetectorRef } from "@angular/core";
import { LayoutConfigService } from "../../../core/_base/layout";
import { AuthService } from "../../..//core/auth";
import { MenuService } from "../../../services/menu.service";

@Component({
	selector: "mm-menu-performance",
	templateUrl: "./menu-performance.component.html",
	styleUrls: ["./menu-performance.component.scss"]
})
export class MenuPerformanceComponent implements OnInit {
	titleItems: Array<any>;
	selectedFilter: any = "monthly";
	restaurantId: string;
	graphData: any = {};
	showDateFilter: boolean = false;

	menuItems = [
		{
			icon: "flaticon2-calendar-7",
			text: "daily"
		},
		{
			icon: "fa fa-calendar-week",
			text: "weekly"
		},
		{
			icon: "flaticon2-calendar-8",
			text: "monthly"
		},
		{
			icon: "flaticon2-calendar-8",
			text: "yearly"
		}
	];

	/**
	 * Component constructor
	 * @param layoutConfigService
	 */
	constructor(
		private auth: AuthService,
		private layoutConfigService: LayoutConfigService,
		private menuService: MenuService,
		private cd: ChangeDetectorRef
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

		this.menuService
			.getMenuPerformance(this.restaurantId, criteria, filter)
			.subscribe(
				response => {
					this.graphData = {
						title: response.data.Title,
						labels: response.data.Labels,
						datasets: [
							{
								fill: true,

								borderWidth: 3,
								backgroundColor: color(
									this.layoutConfigService.getConfig(
										"colors.state.secondary"
									)
								)
									.alpha(0.4)
									.rgbString(),
								borderColor: color(
									this.layoutConfigService.getConfig(
										"colors.state.secondary"
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
								pointBorderColor: Chart.helpers
									.color("#000000")
									.alpha(0)
									.rgbString(),
								pointHoverBackgroundColor: this.layoutConfigService.getConfig(
									"colors.state.secondary"
								),
								pointHoverBorderColor: Chart.helpers
									.color("#000000")
									.alpha(0.1)
									.rgbString(),
								data: response.data.Data
							}
						]
					};

					this.cd.detectChanges();
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
