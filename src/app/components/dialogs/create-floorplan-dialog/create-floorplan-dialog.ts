import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FloorPlan } from "../../../common/models/floorplan/floorplan";

@Component({
	selector: "create-floorplan-dialog",
	templateUrl: "create-floorplan-dialog.html",
	styleUrls: ["./create-floorplan-dialog.scss"]
})
export class CreateFloorplanDialog {
	floorPlan: FloorPlan = {} as FloorPlan;

	constructor(
		public dialogRef: MatDialogRef<CreateFloorplanDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {        
		if (data) {            
            this.floorPlan = Object.assign({}, this.floorPlan, data);
		}
	}

	toggleReservation(event: any) {
		this.floorPlan.DisabledReservation = event.target.checked;
	}

	dismissDialog(): void {
        this.floorPlan["action"] = !this.data ? "add" : "edit";
		this.dialogRef.close(this.floorPlan);
	}
}
