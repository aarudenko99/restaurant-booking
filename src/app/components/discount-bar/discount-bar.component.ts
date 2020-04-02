import { Component, OnInit, Injector } from '@angular/core';
import { Offer } from '../../common/models/offer';
import { OfferService } from '../../services/offer.service';
import { AbstractController } from '../../controllers/abstract/abstract.controller';
import { MatDialog } from '@angular/material';
import { OffersDialogComponent } from '../dialogs/offers-dialog/offers-dialog.component';

@Component({
	selector: 'mm-discount-bar',
	templateUrl: './discount-bar.component.html',
	styleUrls: ['./discount-bar.component.scss']
})
export class DiscountBarComponent extends AbstractController implements OnInit {
	Offers: Offer;

	constructor(injector: Injector, public dialog: MatDialog, private offerService: OfferService) {
		super(injector);
	}

	ngOnInit() {
		this.loadOffers();
	}

	loadOffers() {
		if (this.SelectedRestaurantId) {
			// Helpers.setLoading(true);
			this.offerService.getAllofferByRestaurant(this.SelectedRestaurantId).subscribe(
				data => {
					this.Offers = data.data;
					// Helpers.setLoading(false);
				},
				error => {
					// Helpers.setLoading(false);
				}
			);
		}
	}

	getOfferRemainingDays(startDate: string, endDate: string) {
		if (startDate != null && endDate != null) {
			const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
			const firstDate = new Date(startDate);
			const secondDate = new Date(endDate);

			const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
			return diffDays;
		}
	}

	openOffersDialog(edit?: boolean, type?: string) {
		// const offer = new Offer({

		// })
		const dialogRef = this.dialog.open(OffersDialogComponent, {
			width: '700px',
			data: {
				edit: edit,
				OfferType: type ? type : 'MenuItem'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log('The dialog was closed', result);
				// this.addTab(result);
			}
		});
	}
}
