import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "mm-error-dialog",
	templateUrl: "./error-dialog.component.html",
	styleUrls: ["./error-dialog.component.scss"]
})
export class ErrorDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ErrorDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {}
}
