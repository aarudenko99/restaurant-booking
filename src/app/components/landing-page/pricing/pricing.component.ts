import { Component, OnInit, Injector, ViewChild } from "@angular/core";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { MijnMenuPlusSignupComponent } from "../../dialogs/mijn-menu-plus-signup/mijn-menu-plus-signup.component";
import { Router } from "@angular/router";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { trigger, transition, useAnimation } from "@angular/animations";
import { slideInUp, slideInDown } from "ngx-animate";

@Component({
	selector: "mm-pricing",
	templateUrl: "./pricing.component.html",
	styleUrls: ["./pricing.component.scss"],
	animations: [
		trigger("slideInUp", [transition("* => *", useAnimation(slideInUp))]),
		trigger("slideInDown", [
			transition("* => *", useAnimation(slideInDown))
		])
	]
})
export class PricingComponent extends AbstractController implements OnInit {
	@ViewChild("mmPlusSwal", { static: true })
	mmPlusSwal: SwalComponent;

	constructor(injector: Injector, private router: Router) {
		super(injector);
	}

	ngOnInit() {}

	openSignUpDialog() {
		const dialogRef = this.dialog.open(MijnMenuPlusSignupComponent, {
			width: "700px",
			panelClass: "mm-plus-signup-form-dialog",
			data: {}
		});

		dialogRef.afterClosed().subscribe(signUpResponse => {
			if (signUpResponse) {
				this.mmPlusSwal.fire().then(result => {
					if (result.value) {
						this.router.navigate(["/auth/register"]);
					}
				});
			}
		});
	}
}
