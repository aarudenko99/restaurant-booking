// Angular
import {
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
	SimpleChanges,
	ChangeDetectorRef,
	OnChanges
} from "@angular/core";
// Layout config
import { LayoutConfigService } from "../../../../../core/_base/layout";
import { GraphData } from "../../../../../common/models/graph-data";

/**
 * Sample components with sample data
 */
@Component({
	selector: "kt-widget12",
	templateUrl: "./widget12.component.html",
	styleUrls: ["./widget12.component.scss"]
})
export class Widget12Component implements OnInit, OnChanges {
	// Public properties
	@Input() data: GraphData;
	@Input() type: string = "line";
	@Input() euro: boolean;
	@ViewChild("chart", { static: true }) chart: ElementRef;

	/**
	 * Component constructor
	 * @param layoutConfigService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private cd: ChangeDetectorRef
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initChart();
	}

	/**
	 * added initChart method inside the onChange function.
	 * Because of chart component is located inside a super child component.
	 * */
	ngOnChanges() {
		this.initChart();
	}

	// ngOnChanges(changes: SimpleChanges): void {
	// 	if (changes.data.currentValue) {
	// 		console.log("NEW DATA!", changes.data.currentValue);
	// 		const data = changes.data.currentValue;
	// 		const ctx = document.getElementById("kt_chart_order_statistics");
	// 		this.initChart();
	// 		this.chart.nativeElement.data.datasets = data.datasets[0].data;
	// 		this.cd.detectChanges();
	// 	}
	// }

	private initChart() {
		// For more information about the chartjs, visit this link
		// https://www.chartjs.org/docs/latest/getting-started/usage.html
		const chart = new Chart(this.chart.nativeElement, {
			type: this.type,
			data: this.data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: false,
				scales: {
					xAxes: [
						{
							categoryPercentage: 0.35,
							barPercentage: 1.5,
							display: true,
							scaleLabel: {
								display: false,
								labelString: "Month"
							},
							gridLines: false,
							ticks: {
								display: true,
								beginAtZero: true,
								fontColor: this.layoutConfigService.getConfig(
									"colors.base.shape.3"
								),
								fontSize: 13,
								padding: 10
							}
						}
					],
					yAxes: [
						{
							categoryPercentage: 0.35,
							barPercentage: 0.7,
							display: true,
							scaleLabel: {
								display: false,
								labelString: "Value"
							},
							gridLines: {
								color: this.layoutConfigService.getConfig(
									"colors.base.shape.2"
								),
								drawBorder: false,
								offsetGridLines: false,
								drawTicks: false,
								borderDash: [3, 4],
								zeroLineWidth: 1,
								zeroLineColor: this.layoutConfigService.getConfig(
									"colors.base.shape.2"
								),
								zeroLineBorderDash: [3, 4]
							},
							ticks: {
								display: true,
								beginAtZero: true,
								fontColor: this.layoutConfigService.getConfig(
									"colors.base.shape.3"
								),
								fontSize: 13,
								padding: 10
							}
						}
					]
				},
				title: {
					display: false
				},
				hover: {
					mode: "index"
				},
				tooltips: {
					enabled: true,
					intersect: false,
					mode: "nearest",
					bodySpacing: 5,
					yPadding: 10,
					xPadding: 10,
					caretPadding: 0,
					displayColors: false,
					backgroundColor: "#ffffff",
					titleFontColor: "#595d6e",
					cornerRadius: 4,
					footerSpacing: 0,
					titleSpacing: 0,
					callbacks: {
						title: (tooltipItem, data) => {
							const name =
								data.datasets[tooltipItem[0].datasetIndex].data[
									tooltipItem[0].index
								].Name;
							console.log(
								data.datasets[tooltipItem[0].datasetIndex].data[
									tooltipItem[0].index
								],
								this.euro,
								tooltipItem
							);

							return !name
								? this.euro
									? "€" + tooltipItem[0].value
									: "Aantal: " + tooltipItem[0].value
								: name;
						},
						labelTextColor: () => {
							return "#595d6e";
						},
						label: (tooltipItem, data) => {
							const name =
								data.datasets[tooltipItem.datasetIndex].data[
									tooltipItem.index
								].Name;
							console.log(name);

							return name
								? this.euro
									? "€" + tooltipItem.value
									: "Aantal: " + tooltipItem.value
								: name;
						},
						afterLabel: (tooltipItem, data) => {
							const description =
								data.datasets[tooltipItem.datasetIndex].data[
									tooltipItem.index
								].Description;
							return description;
						}
					}
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 5,
						bottom: 5
					}
				}
			}
		});

		chart.update();
	}
}
