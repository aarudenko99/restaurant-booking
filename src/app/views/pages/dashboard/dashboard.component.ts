// Angular
import { Component, OnInit, ChangeDetectorRef, Injector } from "@angular/core";
// Services
import { TableService } from "../../../services/table.service";
// Widgets model
import { TourService } from "ngx-tour-md-menu";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "../../../core/auth";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { Authorization } from "../../../common/models/mollie/authorization";
import { Alert } from "../../../common/models/alert";
import "rxjs/add/operator/filter";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent extends AbstractController implements OnInit {
	selectedRestaurantId: string;
	setupProgressDone: boolean;
	setupSteps: object;
	alert: Alert = new Alert();
	private authorization: Authorization = new Authorization();

	constructor(
		injector: Injector,
		public tableService: TableService,
		private tourService: TourService,
		private cd: ChangeDetectorRef,
		public auth: AuthService,
        private router: Router,
        private translate: TranslateService
	) {
		super(injector);
		this.tourService.initialize([
			{
				anchorId: "testId",
				content: "Some content",
				title: "First"
			},
			{
				anchorId: "another.anchor.id",
				content: "Other content",
				title: "Second"
			}
		]);
	}

	ngOnInit(): void {
		this.tourService.start();
		this.mollieConnectRedirect();
		this.auth.selectedRestaurantId.subscribe(id => {
			if (!id && !this.auth.getRestaurantId()) {
				this.setupProgressDone = false;
				this.setupSteps = {
					User: { RestaurantSetup: false },
					Restaurant: { MenuSetup: false }
				};
				return;
            }
            this.getAccSetupProgress();
		});
	}

    getAccSetupProgress() {
        console.log(JSON.parse(localStorage.getItem('AccSetupProgress')));
        
        if(localStorage.getItem("AccSetupProgress") !== 'undefined') {
            this.setupSteps = JSON.parse(localStorage.getItem("AccSetupProgress"));
            const restaurantSetup = this.setupSteps['User'].RestaurantSetup;
            const menuSetup = this.setupSteps['Restaurant'].MenuSetup;
            
            if (this.auth.getMijnMenuPlus() && !this.setupSteps['Restaurant'].FloorPlanSetup) {
                this.alert.type = "info";
                this.alert.message = this.translate.instant('ACC_SETUP.FLOORPLAN.TITLE');
                this.alert.showAlert = true;
            }
            if (restaurantSetup && menuSetup) {
                this.setupProgressDone = true;
            } else {
                this.setupProgressDone = false;
            }
            
            this.cd.detectChanges();
        }
    }

	mollieConnectRedirect() {
		this.route.queryParams
			.filter(params => params.code)
			.subscribe(params => {
				this.authorization.authorization_code = params.code;
				this.authorization.restaurantId = this.auth.getRestaurantId();
				this.mollieService
					.getAccessToken(this.authorization)
					.subscribe(data => {
						if (!data) {
							return;
						}
						this.mollieService
							.createMollieCustomer(this.auth.getRestaurantId())
							.subscribe(customer => {
								if (customer) {
									this.openMijnMenuPlusDialog(true);
								}
							});
					});
			});
	}

	goToTableManagement() {
		this.router.navigate(["/dashboard/tablemanagement"]);
	}
}
