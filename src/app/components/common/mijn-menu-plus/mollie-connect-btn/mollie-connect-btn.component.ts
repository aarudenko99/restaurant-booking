import { Component, OnInit, Input } from "@angular/core";
import { MollieService } from "../../../../services/mollie.service";

@Component({
	selector: "mm-mollie-connect-btn",
	templateUrl: "./mollie-connect-btn.component.html",
	styleUrls: ["./mollie-connect-btn.component.scss"]
})
export class MollieConnectBtnComponent implements OnInit {
	@Input() redirectUrl: string;

	constructor(private mollieService: MollieService) {}

	ngOnInit() {}

	authorize() {
		const auth = {
			scope: "payments.read payments.write profiles.read profiles.write"
			// redirectUrl: this.redirectUrl
		};
		this.mollieService
			.mollieAuth(auth)
			.subscribe(response => (window.location.href = response.data));
	}
}
