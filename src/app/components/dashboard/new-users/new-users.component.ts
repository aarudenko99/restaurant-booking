import {
	Component,
	OnInit,
	Injector,
	Input,
	ChangeDetectorRef
} from "@angular/core";
import { User, AuthService } from "../../../core/auth";
import { UserService } from "../../../services/user.service";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { MatDialog } from "@angular/material";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";

@Component({
	selector: "mm-new-users",
	templateUrl: "./new-users.component.html",
	styleUrls: ["./new-users.component.scss"]
})
export class NewUsersComponent extends AbstractController implements OnInit {
	selectedRestaurantId: string;
	selectUser: User;
	users: Array<User>;
	auth: AuthService;
	userService: UserService;
	layoutUtilsService: LayoutUtilsService;

	constructor(
		injector: Injector,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef
	) {
		super(injector);
		this.auth = this.injector.get(AuthService);
		this.layoutUtilsService = this.injector.get(LayoutUtilsService);
		this.userService = this.injector.get(UserService);
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.users = [];
			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.selectedRestaurantId = id;
				this.loadData(id);
			}
		});
	}

	ngOnInit() {}

	loadData(restaurantId: string): void {
		const userQty = "5";
		this.userService
			.getNewUsers(restaurantId, userQty)
			.subscribe(newUsers => {
				this.users = newUsers.data;
			});
		// this.cd.detectChanges();
	}

	togglePopOver(selectUser: User) {
		this.selectUser = selectUser;
	}

	deleteUser() {
		this.auth.deleteUser(this.selectUser._id).subscribe(response => {
			if (response) {
				const deleteMessage = `You have deleted ${this.selectUser.FullName}`;
				this.layoutUtilsService.showActionNotification(
					deleteMessage,
					MessageType.Delete
				);
				this.userService
					.getNewUsers(this.SelectedRestaurantId, "5")
					.subscribe(newUsers => {
						this.users = newUsers.data;
						this.cd.detectChanges();
					});
			}
		});
	}
	//   openReservationDialog(reservation: Reservations) {
	//     const dialogRef = this.dialog.open(ReservationDialogComponent, {
	//         width: '50%',
	//         data: {
	//             title: 'Test',
	//             reservation: reservation
	//         }
	//     });

	//     dialogRef.afterClosed().subscribe(result => {
	//         if (result) {
	//             console.log('The dialog was closed', result);
	//             const deleteMessage = `You have edited the reservation of ${reservation.FullName}`;
	//             this.layoutUtilsService.showActionNotification(deleteMessage, MessageType.Delete);
	//         }
	//     });
	// }
}
