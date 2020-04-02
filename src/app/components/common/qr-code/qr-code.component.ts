import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Table } from "../../../common/models/floorplan/table";

@Component({
	selector: "mm-qr-code",
	templateUrl: "./qr-code.component.html",
	styleUrls: ["./qr-code.component.scss"]
})
export class QrCodeComponent implements OnInit {
	table: Table;
	imageSrc: string;

	constructor(
		public dialogRef: MatDialogRef<QrCodeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data) {
			this.table = data.table;
			this.imageSrc = data.table.QrCodeUrl;
		}
	}

	ngOnInit() {}
}
