// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page/landing-page.component";
import { AboutMijnMenuComponent } from "./components/landing-page/about-mijn-menu/about-mijn-menu.component";
import { ContactUsComponent } from "./components/landing-page/contact-us/contact-us.component";
import { TheAppComponent } from "./components/landing-page/the-app/the-app.component";
import { LandingPageLayoutComponent } from "./components/landing-page/landing-page-layout/landing-page-layout.component";
import { PricingComponent } from "./components/landing-page/pricing/pricing.component";
import { MijnRestaurantComponent } from "./components/landing-page/mijn-restaurant/mijn-restaurant.component";
import { CookieStatementComponent } from "./components/landing-page/cookie-statement/cookie-statement.component";
import { PrivacyStatementComponent } from "./components/landing-page/privacy-statement/privacy-statement.component";

const routes: Routes = [
	{
		path: "",
		component: LandingPageLayoutComponent,
		children: [
			{ path: "", redirectTo: "home", pathMatch: "full" },
			{ path: "home", component: LandingPageComponent },
			{ path: "contact", component: ContactUsComponent },
			{ path: "mijn-menu", component: TheAppComponent },
			{ path: "about", component: AboutMijnMenuComponent },
			{ path: "mijn-restaurant", component: MijnRestaurantComponent },
			{ path: "tarieven", component: PricingComponent },
			{ path: "cookiebeleid", component: CookieStatementComponent },
			{ path: "privacybeleid", component: PrivacyStatementComponent }
		]
	},

	{
		path: "auth",
		loadChildren: () =>
			import("app/views/pages/auth/auth.module").then(m => m.AuthModule)
	},

	// enable this router to set which demo theme to load,
	// leave the path value empty to enter into nested router in ThemeModule
	// {path: '', loadChildren: 'app/views/themes/dashboard/theme.module#ThemeModule'},

	/** START: remove this themes list on production */
	// { path: "", redirectTo: "template", pathMatch: "full" },
	// list of routers specified by demos, for demo purpose only!
	{
		path: "dashboard",
		loadChildren: () =>
			import("app/views/themes/dashboard/theme.module").then(
				m => m.ThemeModule
			)
	},
	/** END: themes list end */

	{ path: "**", redirectTo: "dashboard/error/403", pathMatch: "full" }
	// {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
