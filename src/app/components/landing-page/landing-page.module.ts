import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { OwlModule } from "ngx-owl-carousel";
import { TheAppComponent } from "./the-app/the-app.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutMijnMenuComponent } from "./about-mijn-menu/about-mijn-menu.component";
import { LandingPageLayoutComponent } from "./landing-page-layout/landing-page-layout.component";
import { PricingComponent } from "./pricing/pricing.component";
import { MijnMenuPlusSignUpDialogModule } from "../dialogs/mijn-menu-plus-signup/mijn-menu-plus-signup.component.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { MijnRestaurantComponent } from './mijn-restaurant/mijn-restaurant.component';
import { CookieStatementComponent } from './cookie-statement/cookie-statement.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

@NgModule({
	declarations: [
		LandingPageComponent,
		TheAppComponent,
		ContactUsComponent,
		AboutMijnMenuComponent,
		LandingPageLayoutComponent,
		PricingComponent,
		MijnRestaurantComponent,
		CookieStatementComponent,
		PrivacyStatementComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		OwlModule,
		SweetAlert2Module,
		MijnMenuPlusSignUpDialogModule
	]
})
export class LandingPageModule {}
