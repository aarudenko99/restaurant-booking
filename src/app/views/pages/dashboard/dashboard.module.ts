// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

// Core Module
import { CoreModule } from "../../../core/core.module";
import { PartialsModule } from "../../partials/partials.module";
import { DashboardComponent } from "./dashboard.component";
import { ReviewsModule } from "../../../components/reviews/review.module";
import { MenuComponentModule } from "../../../components/menu/menu.component.module";
import { TopDataItemModule } from "../../../components/common/top-data-item/top-data-item.module";
import { PrintModule } from "../../../components/common/print/print.module";
import { OrderQuantityModule } from "../../../components/common/order-quantity/order-quantity.module";

import { DashboardComponentModule } from "../../../components/dashboard/dashboard.component.module";

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		ReviewsModule,
		MenuComponentModule,
		TopDataItemModule,
		DashboardComponentModule,
		PrintModule,
		OrderQuantityModule,
		SweetAlert2Module,
		RouterModule.forChild([
			{
				path: "",
				component: DashboardComponent
			}
		])
	],
	providers: [],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
