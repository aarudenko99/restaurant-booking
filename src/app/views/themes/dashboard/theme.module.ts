import { NgxPermissionsModule } from "ngx-permissions";
// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
// Angular Material
import {
	MatButtonModule,
	MatProgressBarModule,
	MatTabsModule,
	MatTooltipModule
} from "@angular/material";
// NgBootstrap
import {
	NgbProgressbarModule,
	NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
// Translation
import { TranslateModule } from "@ngx-translate/core";
// Loading bar
import { LoadingBarModule } from "@ngx-loading-bar/core";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// Ngx DatePicker
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
// Perfect Scrollbar
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
// Core Module
import { RoleEffects } from "../../../core/auth";
import { CoreModule } from "../../../core/core.module";
import { HeaderComponent } from "./header/header.component";
import { AsideLeftComponent } from "./aside/aside-left.component";
import { FooterComponent } from "./footer/footer.component";
import { SubheaderComponent } from "./subheader/subheader.component";
import { BrandComponent } from "./brand/brand.component";
import { TopbarComponent } from "./header/topbar/topbar.component";
import { MenuHorizontalComponent } from "./header/menu-horizontal/menu-horizontal.component";
import { PartialsModule } from "../../partials/partials.module";
import { BaseComponent } from "./base/base.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesModule } from "../../pages/pages.module";
import { HtmlClassService } from "./html-class.service";
import { HeaderMobileComponent } from "./header/header-mobile/header-mobile.component";
import { ErrorPageComponent } from "./content/error-page/error-page.component";
import { MijnMenuPlusDialogModule } from "../../../components/dialogs/mijn-menu-plus-dialog/mijn-menu-plus.component.module";
import { PaymentInfoDialogModule } from "../../../components/dialogs/payment-information/payment-information.component.module";

@NgModule({
	declarations: [
		BaseComponent,
		FooterComponent,

		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent
	],
	exports: [
		BaseComponent,
		FooterComponent,

		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent
	],
	providers: [HtmlClassService],
	imports: [
		CommonModule,
		RouterModule,
		NgxPermissionsModule.forChild(),
		PagesRoutingModule,
		PagesModule,
		PartialsModule,
		CoreModule,
		PerfectScrollbarModule,
		FormsModule,
		MatProgressBarModule,
		MatTabsModule,
		EffectsModule.forFeature([RoleEffects]),
		MatButtonModule,
		MatTooltipModule,
		TranslateModule.forChild(),
		LoadingBarModule,
		NgxDaterangepickerMd,
		InlineSVGModule,
		PaymentInfoDialogModule,
		TranslateModule,

		// ng-bootstrap modules
		NgbProgressbarModule,
		NgbTooltipModule,

		MijnMenuPlusDialogModule
	]
})
export class ThemeModule {}
