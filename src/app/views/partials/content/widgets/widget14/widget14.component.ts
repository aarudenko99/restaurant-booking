// Angular
import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';

@Component({
	selector: 'kt-widget14',
	templateUrl: './widget14.component.html',
	styleUrls: ['./widget14.component.scss']
})
export class Widget14Component implements OnInit, OnChanges {
	// Public properties
	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild('chart', { static: true }) chart: ElementRef;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// console.log(this.data);
		// if (!this.data) {
		this.data = {
			labels: this.data.labels,
			datasets: [
				{
					// label: 'dataset 1',
					backgroundColor: this.layoutConfigService.getConfig('colors.state.success'),
					// backgroundColor: '#ffba47',
					data: this.data.datasets[0].data
				},
				{
					// label: 'dataset 2',
					backgroundColor: '#f3f3fb',
					data: [15, 20, 25, 30, 25, 20, 15]
				}
			]
		};
		// }
		console.log(this.data);
		this.initChartJS();
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes.data.currentValue, this.data);
		if (changes.data.currentValue) {
			// this.data = changes.data.currentValue;
			console.log(changes.data.currentValue, this.data.datasets);
			// this.initChartJS();
		}
	}

	/** Init chart */
	initChartJS() {
		// For more information about the chartjs, visit this link
		// https://www.chartjs.org/docs/latest/getting-started/usage.html

		const chart = new Chart(this.chart.nativeElement, {
			type: 'bar',
			data: this.data,
			options: {
				title: {
					display: false
				},
				tooltips: {
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false
				},
				responsive: true,
				maintainAspectRatio: false,
				barRadius: 4,
				scales: {
					xAxes: [
						{
							display: false,
							gridLines: false,
							stacked: true
						}
					],
					yAxes: [
						{
							display: false,
							stacked: true,
							gridLines: false
						}
					]
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				}
			}
		});
	}
}
