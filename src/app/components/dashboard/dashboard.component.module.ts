import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { PartialsModule } from "../../views/partials/partials.module";
import { NewUsersComponent } from "./new-users/new-users.component";
import { EmptyTableComponentsModule } from "../common/empty-table/empty-table.module";
import { MaterialImportModule } from "../common/angular-material/material.module";
import { RevenueChartComponent } from "./revenue-chart/revenue-chart.component";
import { TranslateModule } from "@ngx-translate/core";
import { RecentActivityComponent } from "./recent-activity/recent-activity.component";
import { ActivityItemComponent } from "./recent-activity/activity-item/activity-item.component";
import { SetupStepsComponent } from "./setup-steps/setup-steps.component";
import { NotificationItemModule } from "../../components/common/notification-item/notification-item.module";
import { GraphDateFilterModule } from "../common/graph-date-filter/graph-date-filter.module";

@NgModule({
	declarations: [
		NewUsersComponent,
		RevenueChartComponent,
		RecentActivityComponent,
		ActivityItemComponent,
		SetupStepsComponent
	],
	exports: [
		NewUsersComponent,
		RevenueChartComponent,
		RecentActivityComponent,
		SetupStepsComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		MatExpansionModule,
		MaterialImportModule,
		TranslateModule,
		NgbModule,
		InlineSVGModule,
		EmptyTableComponentsModule,
		NotificationItemModule,
		GraphDateFilterModule
	]
})
export class DashboardComponentModule {}
