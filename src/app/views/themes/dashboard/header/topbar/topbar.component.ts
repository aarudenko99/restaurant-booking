// Angular
import { Component, Injector, OnInit, ChangeDetectorRef } from "@angular/core";
import { AbstractController } from "../../../../../controllers/abstract/abstract.controller";
import { PaymentInformationComponent } from "../../../../../components/dialogs/payment-information/payment-information.component";

@Component({
	selector: "kt-topbar",
	templateUrl: "./topbar.component.html",
	styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent extends AbstractController implements OnInit {
	mijnMenuPlus: boolean;
	constructor(injector: Injector, private cd: ChangeDetectorRef) {
		super(injector);
	}

	ngOnInit() {
		this.auth.selectedRestaurant.subscribe(() => {
			this.mijnMenuPlus = this.auth.getMijnMenuPlus();
			this.cd.detectChanges();
		});
	}

	openPaymentInformation() {
		this.dialog.open(PaymentInformationComponent, {
			width: "40%",
			panelClass: ["kt-portlet-dialog", "kt-portlet-full-height"],
			data: { restaurantId: this.auth.getRestaurantId() }
		});
	}
}
