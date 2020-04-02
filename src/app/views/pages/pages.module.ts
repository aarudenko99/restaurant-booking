// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// Partials
import { PartialsModule } from "../partials/partials.module";
// Pages
import { CoreModule } from "../../core/core.module";
import { UserManagementModule } from "./user-management/user-management.module";
import { OffersComponent } from "./offers/offers.component";

// Page Modules
import { MenuModule } from "./menu/menu.component.module";
import { ReservationModule } from "./reservations/reservations.component.module";
import { TableManagementModule } from "./table-management/table-management.component.module";
import { ActiveBillsModule } from "./active-bills/active-bills.component.module";

import { OrdersPageModule } from "./live-orders/live-orders.module";
import { CreateRestaurantModule } from "./create-restaurant/create-restaurant.module";
import { ViewRestaurantPageModule } from "./view-restaurant/view-restaurant.module";
import { UserProfileModule } from "./user-profile/user-profile.module";

@NgModule({
	declarations: [OffersComponent],
	exports: [OffersComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		// Pages
		UserManagementModule,
		MenuModule,
		UserProfileModule,
		ReservationModule,
		TableManagementModule,
		ActiveBillsModule,
		OrdersPageModule,
		CreateRestaurantModule,
		ViewRestaurantPageModule
	],
	providers: []
})
export class PagesModule {}
