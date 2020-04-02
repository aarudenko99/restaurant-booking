import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "mm-table-bill",
	templateUrl: "./table-bill.component.html",
	styleUrls: ["./table-bill.component.scss"]
})
export class TableBillComponent implements OnInit {
	edit: boolean;

	constructor(
		public dialogRef: MatDialogRef<TableBillComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data) {
			console.log(data.bill);
		}
	}

	ngOnInit() {}

	updateBill() {
		console.log("updateBill");
	}
}
