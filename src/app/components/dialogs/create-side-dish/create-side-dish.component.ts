import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { SideDish } from "../../../common/models/menu/side-dish";
import { MenuService } from "../../../services/menu.service";
import { AuthService } from "../../../core/auth";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";

@Component({
	selector: "mm-create-side-dish",
	templateUrl: "./create-side-dish.component.html",
	styleUrls: ["./create-side-dish.component.scss"]
})
export class CreateSideDishComponent implements OnInit {
	sideDish: SideDish = new SideDish();

	constructor(
		public dialogRef: MatDialogRef<CreateSideDishComponent>,
		private menuService: MenuService,
		private auth: AuthService,
		private layoutUtilsService: LayoutUtilsService
	) {}

	ngOnInit() {}

	dismissDialog() {
		console.log(this.sideDish);
		this.sideDish.RestaurantId = this.auth.getRestaurantId();
		this.menuService.addSideDish(this.sideDish).subscribe(response => {
			if (response) {
				this.dialogRef.close(response.data);
				const createMessage = `You have succesfully added a Side Dish`;
				this.layoutUtilsService.showActionNotification(
					createMessage,
					MessageType.Create,
					10000,
					true,
					false
				);
			}
		});
	}
}
