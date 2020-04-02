import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
	MatButtonModule,
	MatIconModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule
} from "@angular/material";
import { CoreModule } from "../../../../core/core.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// Datatable
import { DataTableComponent } from "./general/data-table/data-table.component";
// General widgets
import { Widget1Component } from "./widget1/widget1.component";
import { Widget4Component } from "./widget4/widget4.component";
import { Widget5Component } from "./widget5/widget5.component";
import { Widget12Component } from "./widget12/widget12.component";
import { Widget14Component } from "./widget14/widget14.component";
import { Widget26Component } from "./widget26/widget26.component";
import { DoughnutChartComponent } from "./doughnut-chart/doughnut-chart.component";
import { Timeline2Component } from "./timeline2/timeline2.component";
import { RestaurantProfileComponent } from "./restaurant-profile/restaurant-profile.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [
		DataTableComponent,
		// Widgets
		Widget1Component,
		Widget4Component,
		Widget5Component,
		Widget12Component,
		Widget14Component,
		DoughnutChartComponent,
		Widget26Component,
		Timeline2Component,
		RestaurantProfileComponent
	],
	exports: [
		DataTableComponent,
		// Widgets
		Widget1Component,
		Widget4Component,
		Widget5Component,
		Widget12Component,
		Widget14Component,
		DoughnutChartComponent,
		Widget26Component,
		Timeline2Component,
		RestaurantProfileComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PerfectScrollbarModule,
		MatTableModule,
		CoreModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		NgbDropdownModule
	]
})
export class WidgetModule {}
