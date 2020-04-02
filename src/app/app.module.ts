// Angular
import {
	BrowserModule,
	HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GestureConfig, MatProgressSpinnerModule } from "@angular/material";
import { OverlayModule } from "@angular/cdk/overlay";
// Angular in memory
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// Perfect Scroll bar
import {
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
// Env
import { environment } from "../environments/environment";
// Hammer JS
import "hammerjs";
// NGX Permissions
import { NgxPermissionsModule } from "ngx-permissions";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// State
import { metaReducers, reducers } from "./core/reducers";
// Copmponents
import { AppComponent } from "./app.component";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
// Partials
import { PartialsModule } from "./views/partials/partials.module";
// Layout Services
import {
	DataTableService,
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService
} from "./core/_base/layout";
// Auth
import { AuthModule } from "./views/pages/auth/auth.module";
import { AuthService } from "./core/auth";
// CRUD
import {
	HttpUtilsService,
	LayoutUtilsService,
	TypesUtilsService
} from "./core/_base/crud";
// Config
import { LayoutConfig } from "./core/_config/config/layout.config";
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from "ngx-highlightjs";
import * as typescript from "highlight.js/lib/languages/typescript";
import * as scss from "highlight.js/lib/languages/scss";
import * as xml from "highlight.js/lib/languages/xml";
import * as json from "highlight.js/lib/languages/json";

import { GlobalService } from "./services/global.service";
import { JwtInterceptor } from "./core/auth/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./core/auth/_helpers/error.interceptor";
import { StorageModule } from "@ngx-pwa/local-storage";

import { ToastrModule } from "ngx-toastr";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BlockUIModule } from "ng-block-ui";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { RouterModule } from "@angular/router";

import { TourMatMenuModule } from "ngx-tour-md-menu";
import { ThermalPrintModule } from "ng-thermal-print";
import { ServiceWorkerModule } from "@angular/service-worker";
import { LandingPageModule } from "./components/landing-page/landing-page.module";
import { ErrorDialogModule } from "./components/common/error-dialog/error-dialog.module";
import { AvgDialogModule } from "./components/dialogs/avg-dialog/avg-dialog.module";

const token = localStorage.getItem("token");
const config: SocketIoConfig = {
	url: "https://mijn-menu.nl",
	options: {
		path: "/api/socket.io",
		query: "token=" + token,
		forceNew: true,
		autoConnect: false
	}
};

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{ name: "typescript", func: typescript },
		{ name: "scss", func: scss },
		{ name: "xml", func: xml },
		{ name: "json", func: json }
	];
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		PerfectScrollbarModule,
		BlockUIModule.forRoot(),
		SocketIoModule.forRoot(config),
		ToastrModule.forRoot(),
		SweetAlert2Module.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		OverlayModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		RouterModule,
		ThermalPrintModule,
		ErrorDialogModule,
		AvgDialogModule,
		TourMatMenuModule.forRoot(),
		StorageModule.forRoot({
			IDBNoWrap: true
		}),
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production
		}),
		LandingPageModule
	],
	exports: [],
	providers: [
		AuthService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		GlobalService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService],
			multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
