import { AuthService } from './../../core/auth';
import { Injector, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AbstractController } from '../abstract/abstract.controller';
import { ReservationService } from '../../services/reservation.service';
import { Reservations } from '../../common/models/reservations';

export abstract class ReservationController extends AbstractController {
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	SelectedRestaurant: any;
	auth: AuthService;
	reservations = new MatTableDataSource<Reservations>();
	reservationService: ReservationService;

	constructor(injector: Injector) {
		super(injector);
		this.reservationService = this.injector.get(ReservationService);
		this.auth = this.injector.get(AuthService);
	}

	getReservations(): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurantId) {
				// Helpers.setLoading(true);
				this.reservationService.getReservations(this.SelectedRestaurantId).subscribe(
					data => {
						this.isLoadingResults = false;
						this.reservations.data = data.data as Reservations[];
						this.isRateLimitReached = false;
						console.log(data.data);
						resolve(this.reservations);
						// Helpers.setLoading(false);
					},
					error => {
						this.isLoadingResults = false;
						this.isRateLimitReached = true;
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}

	getUpcomingReservations(): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurant) {
				// Helpers.setLoading(true);
				this.reservationService.getUpcomingReservations(this.SelectedRestaurantId).subscribe(
					data => {
						this.isLoadingResults = false;
						this.reservations.data = data.data as Reservations[];
						console.log(this.reservations.data);
						this.isRateLimitReached = false;
						resolve(data.data);
					},
					error => {
						this.isLoadingResults = false;
						this.isRateLimitReached = true;
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}

	editReservation(reservation: Reservations) {
		this.reservationService.updateReservations(reservation).subscribe(() => console.log(this.reservations));
	}

	deleteReservation(id: string) {
		this.reservationService.deleteReservation(id).subscribe(() => {
			this.reservations.data = this.reservations.data.filter(dataSrc => dataSrc['_id'] !== id);
		});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // reservations defaults to lowercase matches
		this.reservations.filter = filterValue;
	}
}
