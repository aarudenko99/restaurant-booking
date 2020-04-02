import { Subscription } from "rxjs";
// Angular
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	Injector
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// Layout
import {
	LayoutConfigService,
	SplashScreenService,
	TranslationService
} from "./core/_base/layout";
// language list
import { locale as nlLang } from "./core/_config/i18n/nl";
import { locale as enLang } from "./core/_config/i18n/en";
import { locale as esLang } from "./core/_config/i18n/es";
import { locale as deLang } from "./core/_config/i18n/de";
import { locale as frLang } from "./core/_config/i18n/fr";

import { SwPush } from "@angular/service-worker";

// Services
import { NotificationService } from "./services/notification.service";
import { AuthService } from "./core/auth";
import { RestaurantService } from "./services/restaurant.service";
import { HttpParams } from '@angular/common/http';

@Component({
	// tslint:disable-next-line:component-selector
	selector: "body[kt-root]",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	readonly VAPID_PUBLIC_KEY =
		"BHT6HLmwWVwS9lXd1S-uZ02-LvoGhfPjcSYparnjPgFRn3Uc7IqiUPNbWfw09SOXOFLmh7Jiq3QzlCgC2hKUycM";

	title = "Mijn Menu";
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private translationService: TranslationService,
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private splashScreenService: SplashScreenService,
		private notifcationService: NotificationService,
		private restaurantService: RestaurantService,
		private auth: AuthService,
		private swPush: SwPush
	) {
		// register translations
		this.translationService.loadTranslations(
			nlLang,
			enLang,
			esLang,
			deLang,
			frLang
		);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig("loader.enabled");

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add("kt-page--loaded");
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
        this.subscribeToNotifications();
        this.getAccSetupProgress();
    }
    
    
    getAccSetupProgress() {
        this.auth.selectedRestaurantId.subscribe(restaurantId => {
            const RestaurantId = restaurantId ? restaurantId : this.auth.getRestaurantId();
            const params: HttpParams = new HttpParams()
                .append("RestaurantId", RestaurantId)
                .append("UserId", this.auth.getUserId());
            this.auth.getSetupProgress(params).subscribe(response => {
                localStorage.setItem(
                    "AccSetupProgress",
                    JSON.stringify(response.data)
                );
            });
        })
    }

	subscribeToNotifications() {
		this.swPush
			.requestSubscription({
				serverPublicKey: this.VAPID_PUBLIC_KEY
			})
			.then(sub => {
				console.log(sub);

				// this.newsletterService.addPushSubscriber(sub).subscribe()
			})
			.catch(err =>
				console.error("Could not subscribe to notifications", err)
			);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
