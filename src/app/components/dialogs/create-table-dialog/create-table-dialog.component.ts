import { Component, Inject } from "@angular/core";
import { Table } from "../../../common/models/floorplan/table";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import tableTypes from "../../constants/table-types";
import { rectangleChairsFunction } from "../../table-management/table/calculate-functions/rectangle-chairs-position";

@Component({
	selector: "mm-create-table-dialog",
	templateUrl: "./create-table-dialog.component.html",
	styleUrls: ["./create-table-dialog.component.scss"]
})
export class CreateTableDialogComponent {
	edit: boolean = false;
	tableModel: Table;
	restaurants: any;
	tableShapes: any;
	seatsOption: any;

	table: Table = new Table();
	DisabledReservation: boolean = false;
	InstantPayment: boolean = false;
	isTableNumberError: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<CreateTableDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
        this.tableShapes = tableTypes;
        console.log(this.data);
        
		if (!!this.data.table) {
			console.log(this.data.table);
			this.edit = true;
			this.table = this.data.table;
			this.changeTableShape(this.table.Shape);
		} else {
			this.onInit();
		}
	}

	onInit() {
        if(!this.data) {
            this.table = Object.assign({}, this.table, {
                Shape: "square",
                Seats: 2
            });
        }
		this.changeTableShape(this.table.Shape);
	}

	toggleInstantPayment(event: any) {
		this.InstantPayment = event.target.checked;
	}

	toggleReservation(event: any) {
		this.DisabledReservation = event.target.checked;
    }
    
	dismissDialog(edit?: boolean) {
		this.isTableNumberError = this.table.TableNr == null;
		if (
			this.table.TableNr &&
			this.table.Shape &&
			this.table.Seats &&
			!this.isTableNumberError
		) {
            if (edit) {
                if(this.table.Shape === 'rectangle') {
                    const floorSize = JSON.parse(localStorage.getItem('floorSize'));
                    this.table.Size.height = 113;
                    for (let tid = 0; tid < (+this.table.Seats - 2) / 2; tid++) {
                        this.table.Size.height =
                            +this.table.Size.height + ((floorSize / 100) * 12) / 2.5;
                    }                    
                } else {
                    this.table.Size.height = this.table.Size.width;
                }
            }
            
			this.dialogRef.close({
				_id: this.table._id ? this.table._id : null,
				TableNr: this.table.TableNr ? this.table.TableNr : null,
				DisabledReservation: this.DisabledReservation,
				InstantPayment: this.InstantPayment,
				edit: this.edit,
				Position: {
					rotation: edit ? this.table.Position["rotation"] : 0,
					x: edit ? this.table.Position["x"] : 0.6,
					y: edit ? this.table.Position["y"] : 0.06
				},
				Size: { width: edit ? this.table.Size.width : '113' , height: edit ? this.table.Size.height : "113" },
				Name: this.table.Name,
				Status: this.table.Status ? this.table.Status : "Vacant",
				Seats: this.table.Seats,
				Shape: this.table.Shape,
				SeatsOccupied: 0
			});
		}
	}

	editTable() {
		this.dismissDialog(true);
	}

	// changeTableStatus(id: any) {
	// 	this.tableModel = new Table();
	// 	this.tableModel._id = id;
	// 	this.tableModel.Status = "Vacant";
	// 	this.tableService.updateStatus(this.tableModel).subscribe(
	// 		data => {},
	// 		error => {}
	// 	);
	// }

	changeTableShape(shape: string) {
		// console.log(shape, typeof shape, shape, shape.indexOf("rectangle") > 0);
        // this.table.Shape = shape;
        let initialSeatCount: number;
        if(!this.data.table) {
            initialSeatCount = shape === "rectangle" ? 6 : 2;
        } else {
            initialSeatCount = this.table.Seats;
        }

		this.table = Object.assign({}, this.table, {
			Shape: shape,
			Seats: initialSeatCount
		});
		if (shape === "square") {
            this.table.Seats = this.edit ? this.table.Seats : 2;
			this.seatsOption = [
				{ id: 1, value: 2, label: "2 - Persons" },
				{ id: 2, value: 4, label: "4 - Persons" }
			];
		} else if (shape === "rectangle") {
            this.table.Seats = this.edit ? this.table.Seats : 6;
			this.seatsOption = [
				{ id: 5, value: 6, label: "6 - Persons" },
				{ id: 5, value: 8, label: "8 - Persons" },
				{ id: 5, value: 10, label: "10 - Persons" },
				{ id: 5, value: 12, label: "12 - Persons" },
				{ id: 5, value: 14, label: "14 - Persons" },
				{ id: 5, value: 16, label: "16 - Persons" },
				{ id: 5, value: 18, label: "18 - Persons" },
				{ id: 5, value: 20, label: "20 - Persons" }
			];
		} else {
            this.table.Seats = this.edit ? this.table.Seats : 4;
			Object.assign({}, this.table, {
				Seats: 4
			});
			this.seatsOption = [
				{ id: 1, value: 2, label: "2 - Persons" },
				{ id: 2, value: 3, label: "3 - Persons" },
				{ id: 3, value: 4, label: "4 - Persons" }
			];
		}
	}
}
