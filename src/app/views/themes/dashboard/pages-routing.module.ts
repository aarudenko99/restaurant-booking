// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./base/base.component";
import { ErrorPageComponent } from "./content/error-page/error-page.component";
// Auth
import { AuthGuard, WaiterGuard, AdminGuard } from "../../../core/auth";
// Menu
import { TableManagementPageComponent } from "../../pages/table-management/table-management.component";
import { ReservationPageComponent } from "../../pages/reservations/reservations.component";
import { MenuPageComponent } from "../../pages/menu/menu.component";
import { LiveOrdersComponent } from "../../pages/live-orders/live-orders.component";

// Other Pages
import { OffersComponent } from "../../pages/offers/offers.component";
import { CreateRestaurantPageComponent } from "../../pages/create-restaurant/create-restaurant.component";
import { ViewRestaurantComponent } from "../../pages/view-restaurant/view-restaurant.component";
import { UserProfilePageComponent } from "../../pages/user-profile/user-profile.component";
import { ActiveBillsComponent } from "../../pages/active-bills/active-bills.component";
import { TableService } from "../../../services/table.service";

const routes: Routes = [
	{
		path: "",
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				// TO DO CREATE CHILD PAGE ROUTING OF MY-RESTAURANTS
				path: "create-restaurant",
				component: CreateRestaurantPageComponent
			},
			{
				// TO DO CREATE CHILD PAGE ROUTING OF MY-RESTAURANTS
				path: "view-restaurant/:id",
				component: ViewRestaurantComponent
			},
			{
				path: "user/profile",
				component: UserProfilePageComponent
			},
			{
				path: "home",
				loadChildren: () =>
					import("app/views/pages/dashboard/dashboard.module").then(
						m => m.DashboardModule
					)
			},
			{
				path: "tablemanagement",
				component: TableManagementPageComponent,
				resolve: {
					floorplansResponse: TableService
				}
			},
			{
				path: "activebills",
				component: ActiveBillsComponent
			},
			{
				path: "offers",
				component: OffersComponent
			},
			{
				path: "reservations",
				component: ReservationPageComponent
			},
			{
				path: "liveorders",
				component: LiveOrdersComponent
			},
			{
				path: "menu", // <= Page URL
				component: MenuPageComponent // <= Page component registration
			},
			{
				path: "user-management/:id",
				loadChildren: () =>
					import(
						"app/views/pages/user-management/user-management.module"
					).then(m => m.UserManagementModule)
			},
			{
				path: "error/403",
				component: ErrorPageComponent,
				data: {
					type: "error-v6",
					code: 403,
					title: "403... Access forbidden",
					desc:
						"Looks like you don't have permission to access for requested page.<br> Please, contact administrator"
				}
			},
			{ path: "error/:type", component: ErrorPageComponent },
			{
				path: "",
				redirectTo: "dashboard",
				pathMatch: "full",
				canActivate: [AdminGuard]
			},
			{
				path: "**",
				redirectTo: "dashboard",
				pathMatch: "full",
				canActivate: [AdminGuard]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [TableService]
})
export class PagesRoutingModule {}
