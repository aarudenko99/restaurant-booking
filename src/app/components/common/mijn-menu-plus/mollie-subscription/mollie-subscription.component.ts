import {
	Component,
	OnInit,
	Input,
	ChangeDetectorRef,
	Output,
	EventEmitter
} from "@angular/core";
import { AuthService } from "../../../../core/auth";
import { MollieService } from "../../../../services/mollie.service";
import { LayoutUtilsService, MessageType } from "../../../../core/_base/crud";

@Component({
	selector: "mm-mollie-subscription",
	templateUrl: "./mollie-subscription.component.html",
	styleUrls: ["./mollie-subscription.component.scss"]
})
export class MollieSubscriptionComponent implements OnInit {
	@Input() edit: boolean;
	@Input() restaurantId: string;
	@Output() cancelSubscription = new EventEmitter<boolean>();
	userInformation: object = {};
	subscriptionInformation: object = {};

	constructor(
		private auth: AuthService,
		private cd: ChangeDetectorRef,
		private mollieService: MollieService,
		private layoutUtilsService: LayoutUtilsService
	) {}

	ngOnInit() {
		this.getMollieSubscriptionDetails();
	}

	getMollieSubscriptionDetails() {
		const restaurantId = this.restaurantId
			? this.restaurantId
			: this.auth.getRestaurantId();
		this.mollieService
			.getMollieMandate(restaurantId)
			.subscribe(response => {
				console.log(response);
				const mandateDetails =
					response.data._embedded.mandates[0].details;

				this.userInformation["consumerName"] =
					mandateDetails.consumerName;
				this.userInformation["consumerAccount"] =
					mandateDetails.consumerAccount;
				this.cd.detectChanges();
			});

		this.mollieService
			.getMollieSubscription(restaurantId)
			.subscribe(subscription => {
				console.log(subscription);

				this.subscriptionInformation =
					subscription.data._embedded.subscriptions[0];
				console.log(this.subscriptionInformation);

				this.cd.detectChanges();
			});
	}

	disableMijnMenuPlus() {
		const restaurantId = this.restaurantId
			? this.restaurantId
			: this.auth.getRestaurantId();
		const body = {
			RestaurantId: restaurantId,
			SubscriptionId: this.subscriptionInformation["subscription"].id
		};

		this.mollieService.deactivateSubscription(body).subscribe(response => {
			if (response && response.data.status === "canceled") {
				const updateMessage = `You have canceled Mijn Menu Plus`;
				this.layoutUtilsService.showActionNotification(
					updateMessage,
					MessageType.Delete
				);

				const restaurant = this.auth.selectedRestaurant.value;
				restaurant["Restaurant"].MijnMenuPlus = false;
				localStorage.setItem(
					"SelectedRestaurant",
					JSON.stringify(restaurant)
				);
				this.auth.selectedRestaurant.next(restaurant);
				this.cancelSubscription.emit(true);
			}
		});
	}
}
