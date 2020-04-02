import { Injector, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { AuthService } from "../../core/auth";
import { MollieService } from "../../services/mollie.service";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { MijnMenuPlusComponent } from "../../components/dialogs/mijn-menu-plus-dialog/mijn-menu-plus.component";
// import { Authorization } from "../../common/models/mollie/authorization";
// import "rxjs/add/operator/filter";
import { AbstractService } from "../../services/abstract.service";

// Layout
import { LayoutUtilsService, MessageType } from "../../core/_base/crud";
import { RestaurantService } from "../../services/restaurant.service";

export abstract class AbstractController {
	// Wires up BlockUI instance
	@BlockUI() blockUI: NgBlockUI;
	@ViewChild("mollieConnectSwal", { static: true })
	mollieConnectSwal: SwalComponent;
	SelectedRestaurant: any;
	SelectedRestaurantId: string;
	parentView: string;

	dialog: MatDialog;
	route: ActivatedRoute;
	auth: AuthService;
	mollieService: MollieService;
	layoutUtilsService: LayoutUtilsService;
    restaurantService: RestaurantService;

	data = {
		sections: null,
		search: "",
		results: []
	};

	state = {
		searched: false,
		statusmessage: ""
	};

	constructor(public injector: Injector) {
		if (localStorage.getItem("SelectedRestaurant") !== "undefined") {
			this.SelectedRestaurant = JSON.parse(
				localStorage.getItem("SelectedRestaurant")
			);
		}
		if (localStorage.getItem("SelectedRestaurantId") !== "undefined") {
			this.SelectedRestaurantId = JSON.parse(
				localStorage.getItem("SelectedRestaurantId")
			);
		}
		this.auth = this.injector.get(AuthService);
		this.dialog = this.injector.get(MatDialog);
		this.route = this.injector.get(ActivatedRoute);
		this.mollieService = this.injector.get(MollieService);
		this.restaurantService = this.injector.get(RestaurantService);
        this.layoutUtilsService = this.injector.get(LayoutUtilsService);
	}

	openMijnMenuPlusDialog(redirect?: boolean) {
		const dialogRef = this.dialog.open(MijnMenuPlusComponent, {
			width: "40%",
			panelClass: ["kt-portlet-dialog", "kt-portlet-full-height"],
			data: redirect ? redirect : false
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (result.status === 200 && result.data) {
					this.mollieConnectSwal.fire();
					const updateMessage = `You have enabled Mijn Menu Plus.`;
					this.layoutUtilsService.showActionNotification(
						updateMessage,
						MessageType.Update
					);
					const restaurant = JSON.parse(
						localStorage.getItem("SelectedRestaurant")
					);
					restaurant["Restaurant"].MijnMenuPlus = true;
					localStorage.setItem(
						"SelectedRestaurant",
						JSON.stringify(restaurant)
					);
					this.auth.selectedRestaurant.next(restaurant);
				}
			}
		});
	}

	loadRestaurants() {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (!currentUser) {
			return;
		}
		this.restaurantService
			.getAllRestaurantByUser(currentUser.data._id)
			.subscribe(
				data => {
					if (!data.data[0]) {
						return;
					}
					this.restaurantService.restaurants.next(data.data);
					const selectedRestaurant = JSON.parse(
						localStorage.getItem("SelectedRestaurant")
					);
					const selectRestaurantId = JSON.parse(
						localStorage.getItem("SelectedRestaurantId")
					);

					localStorage.setItem(
						"AllRestaurants",
						JSON.stringify(data.data)
					);
					if (!!selectedRestaurant && !!selectRestaurantId) {
						this.auth.selectedRestaurant.next(selectedRestaurant);
						this.auth.selectedRestaurantName.next(
							selectedRestaurant.Restaurant.Name
						);
						this.auth.selectedRestaurantId.next(selectRestaurantId);
						this.auth.selectedRestaurant.next(data.data[0]);
					} else {
						localStorage.setItem(
							"SelectedRestaurantId",
							JSON.stringify(data.data[0].Restaurant._id)
						);
						localStorage.setItem(
							"SelectedRestaurant",
							JSON.stringify(data.data[0])
						);
						this.auth.selectedRestaurantName.next(
							data.data[0].Restaurant.Name
						);
						this.auth.selectedRestaurantId.next(
							data.data[0].Restaurant._id
						);
						this.auth.selectedRestaurant.next(data.data[0]);
					}
				},
				error => {}
			);
	}

	showLoading() {
		this.blockUI.start("Loading...");
	}

	hideLoading() {
		setTimeout(() => {
			this.blockUI.stop();
		}, 1500);
	}
}
