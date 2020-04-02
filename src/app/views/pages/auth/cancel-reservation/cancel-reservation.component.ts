import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthNoticeService } from "../../../../core/auth";
import { ReservationService } from "../../../../services/reservation.service";

@Component({
	selector: "mm-cancel-reservation",
	templateUrl: "./cancel-reservation.component.html",
	styleUrls: ["./cancel-reservation.component.scss"]
})
export class CancelReservationComponent implements OnInit {
	reservationCode: string;
	cancelled: boolean;

	constructor(
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private authNoticeService: AuthNoticeService,
		private reservationService: ReservationService
	) {}

	ngOnInit() {
		this.reservationCode = this.route.snapshot.paramMap.get("id");
	}

	cancelReservation() {
		this.reservationService
			.deleteReservation(this.reservationCode)
			.subscribe(response => {
				if (response && response.status === 200) {
					this.cancelled = true;
					console.log(response, this.cancelled);
				} else {
					this.cancelled = false;
					this.authNoticeService.setNotice(
						"Something went wrong while verifying your email try again!",
						"danger"
					);
				}
				this.cd.detectChanges();
			});
	}
}
