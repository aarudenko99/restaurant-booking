import { Injector, ChangeDetectorRef } from "@angular/core";
import { AbstractController } from "../abstract/abstract.controller";
import { TableService } from "../../services/table.service";
import { Table } from "../../common/models/floorplan/table";
import { FloorPlan } from "../../common/models/floorplan/floorplan";

export abstract class FloorPlanController extends AbstractController {
	Tables: Array<any> = [];
	cd: ChangeDetectorRef;
	tableService: TableService;

	constructor(injector: Injector) {
		super(injector);
		this.cd = this.injector.get(ChangeDetectorRef);
		this.tableService = this.injector.get(TableService);
	}

	updateFloorPlan(floorPlan: FloorPlan): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurant) {
				this.tableService.updateFloorPlan(floorPlan).subscribe(
					data => {
                        console.log('updateFloorPlan response', data);
						// this.tableService.activeFloorPlan.next(data.data);
						resolve(data.data);
						// Helpers.setLoading(false);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}

	addTable(floorPlanId: string, table: Table) {
		table = this.setTableSize(table);
		console.log(table);
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurant) {
				this.tableService.addTable(floorPlanId, table).subscribe(
					data => {
						// this.tableService.activeFloorPlan.next(data.data);
						console.log("add Table data: ", data);
						resolve(data.data);
						// Helpers.setLoading(false);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}

	setTableSize(table): Table {
		const floorSize = JSON.parse(localStorage.getItem("floorSize"));
        const zoomLevel = localStorage.getItem("floorZoomLevel") !== 'undefined' ? JSON.parse(localStorage.getItem("floorZoomLevel")) : 10;
		if (table.Shape === "rectangle") {
			// table.Size.width =  +table.Size.width + 10;
			table.Size.height = 113;
			for (let tid = 0; tid < (table.Seats - 2) / 2; tid++) {
				table.Size.height =
					+table.Size.height + ((floorSize / 100) * 12) / 2.5;
			}
		}

		if (table.Shape === "rectangle") {
			table.Size.width = 113 * (1 + zoomLevel / 100);
		} else {
			table.Size.height = 113 * (1 + zoomLevel / 100);
			table.Size.width = 113 * (1 + zoomLevel / 100);
		}

		return table;
	}

	editTable(table: Table): Promise<any> {
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurant) {
				this.tableService.updateTable(table).subscribe(
					data => {
                        let floorPlans = this.tableService.tempPlans;
                        console.log(this.tableService.tempPlans, this.tableService.floorPlans.value);
                        
						const index = floorPlans.findIndex(
							e => e._id === data.data._id
                        );
                        
                        if(index >= 0) {
                            floorPlans[index] = data.data;
                        }
                        console.log('EDIT TABLE FLOORPLAN CONTROLLER', floorPlans, index);
						this.tableService.floorPlans.next(floorPlans);
						this.cd.detectChanges();
						resolve(data.data);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}

	deleteTable(table: any): Promise<any> {
		this.Tables.splice(table.index, 1);
		const promise = new Promise<any>((resolve, reject) => {
			if (this.SelectedRestaurant) {
				this.tableService.deleteTable(table._id).subscribe(
					data => {
						// this.tableService.floorPlans.next(data.data);
						resolve(data.data);
						// Helpers.setLoading(false);
					},
					error => {
						// Helpers.setLoading(false);
					}
				);
			}
		});
		return promise;
	}
}
