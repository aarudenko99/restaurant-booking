import { Component, OnInit, Injector, AfterViewInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ReservationController } from "../../../controllers/reservation/reservation.controller";
import { ReservationDialogComponent } from "../../dialogs/reservation-dialog/reservation-dialog.component";
import { Reservations } from "../../../common/models/reservations";
import { DeleteEntityDialogComponent } from "../../../views/partials/content/crud";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";

@Component({
	selector: "mm-reservation-table-list",
	templateUrl: "./reservation-table-list.component.html",
	styleUrls: ["./reservation-table-list.component.scss"]
})
export class ReservationTableListComponent extends ReservationController
	implements OnInit, AfterViewInit {
	layoutUtilsService: LayoutUtilsService;
	displayedColumns: Array<any> = [
		"BookingType",
		"TableReservationDate",
		"name",
		"TableReservationQuantity",
		"ReservationCode",
		"VisitStatus",
		"action"
	];

	reservationType = ["Lunch", "Breakfast", "Dinner"];
	filterType: string = "";

	constructor(injector: Injector, public dialog: MatDialog) {
		super(injector);
		this.layoutUtilsService = this.injector.get(LayoutUtilsService);
	}

	ngOnInit() {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.SelectedRestaurantId = restaurantId;
			this.getReservations();
		});
	}

	ngAfterViewInit(): void {
		this.reservations.sort = this.sort;
		this.reservations.paginator = this.paginator;
	}

	openReservationDialog(type: string, reservation: Reservations) {
		const dialogRef = this.dialog.open(ReservationDialogComponent, {
			width: "50%",
			data: {
				type: type,
				reservation: reservation
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log("The dialog was closed", result);
				const deleteMessage = `You have edited the reservation of ${reservation.FullName}`;
				this.layoutUtilsService.showActionNotification(
					deleteMessage,
					MessageType.Delete
				);
			}
		});
	}

	deleteReservationDialog(reservation: Reservations) {
		console.log(reservation);
		const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
			panelClass: "kt-portlet-dialog",
			data: {
				title: `Delete ${reservation.FirstName} ${reservation.LastName} ?`,
				description: `Are you sure you want to delete the reservation of: ${reservation.FullName} ${reservation.LastName}?`
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const deleteMessage = `You have deleted the reservation of ${reservation.FullName} ${reservation.LastName}`;
				this.layoutUtilsService.showActionNotification(
					deleteMessage,
					MessageType.Delete
				);
				this.deleteReservation(reservation._id);
			}
		});
	}
}
