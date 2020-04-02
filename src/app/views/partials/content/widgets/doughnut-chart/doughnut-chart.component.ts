// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';

@Component({
    selector: 'kt-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
    // Public properties
    @Input() title: string;
    @Input() desc: string;
    @Input() data: { labels: string[]; datasets: any[] };
    @ViewChild('chart', {static: true}) chart: ElementRef;

    /**
     * Component constructor
     *
     * @param layoutConfigService: LayoutConfigService
     */
    constructor(private layoutConfigService: LayoutConfigService) {
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
        if (!this.data) {
            this.data = {
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10', 'Label 11', 'Label 12', 'Label 13', 'Label 14', 'Label 15', 'Label 16'],
                datasets: [
                    {
                        // label: 'dataset 1',
                        backgroundColor: ['#0074D9', '#FF4136', '#2ECC40', '#FF851B', '#7FDBFF', '#B10DC9'],
                        borderColor: '#fff',
                        borderWidth: 1,
                        hoverBorderColor: ['#0074D9', '#FF4136', '#2ECC40', '#FF851B', '#7FDBFF', '#B10DC9'],
                        hoverBorderWidth: 3,
                        // backgroundColor: '#ffba47',
                        data: [
                            15, 20, 25, 30, 25, 20
                        ]
                    }
                ]
            };
        }

        this.initChartJS();
    }

    /** Init chart */
    initChartJS() {
        // For more information about the chartjs, visit this link
        // https://www.chartjs.org/docs/latest/getting-started/usage.html

        const chart = new Chart(this.chart.nativeElement, {
            type: 'doughnut',
            data: this.data,
            options: {
                title: {
                    display: false,
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
                    xAxes: [{
                        display: false,
                        gridLines: false,
                        stacked: true
                    }],
                    yAxes: [{
                        display: false,
                        stacked: true,
                        gridLines: false
                    }]
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
