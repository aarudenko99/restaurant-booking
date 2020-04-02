import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../components/common/error-dialog/error-dialog.component";

@Injectable({
	providedIn: "root"
})
export class ErrorDialogService {
	constructor(public dialog: MatDialog) {}

	openDialog(data): void {
		this.dialog.open(ErrorDialogComponent, {
			width: "300px",
			panelClass: ["kt-portlet-dialog", "kt-portlet-full-height"],
			data: data
		});
	}
}
