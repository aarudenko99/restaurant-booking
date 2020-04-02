import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "mm-payment-information",
	templateUrl: "./payment-information.component.html",
	styleUrls: ["./payment-information.component.scss"]
})
export class PaymentInformationComponent implements OnInit {
	edit = false;
	restaurantId: string;
	userInformation: object = {};

	constructor(
		public dialogRef: MatDialogRef<PaymentInformationComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data) {
			this.restaurantId = data.restaurantId;
		}
	}

	ngOnInit() {}

	closeDialog() {
		this.dialogRef.close();
	}
}
