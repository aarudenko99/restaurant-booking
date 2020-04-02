import { Component, Inject, Injector } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Reservations } from "../../../common/models/reservations";
import { ReservationController } from "../../../controllers/reservation/reservation.controller";

@Component({
	selector: "mm-reservation-dialog",
	templateUrl: "./reservation-dialog.component.html",
	styleUrls: ["./reservation-dialog.component.scss"]
})
export class ReservationDialogComponent extends ReservationController {
	edit: boolean;
	reservation: Reservations = new Reservations();
	constructor(
		injector: Injector,
		public dialogRef: MatDialogRef<ReservationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		super(injector);
		if (data) {
			console.log(data);
			data.type === "edit" ? (this.edit = true) : (this.edit = false);
			if (data.reservation) {
				this.reservation = data.reservation;
				this.reservation.FullName = `${data.reservation.FirstName} ${data.reservation.LastName}`;
			}
		}
	}

	onClose() {
		this.dialogRef.close(this.data);
	}

	updateReservation() {
		this.editReservation(this.reservation);
		this.dialogRef.close();
	}
}
