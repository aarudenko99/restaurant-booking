import { Component, OnInit, Injector } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FloorPlanController } from "../../../controllers/floorplan/floorplan.controller";
import { CreateTableDialogComponent } from "../../../components/dialogs/create-table-dialog/create-table-dialog.component";
import { FloorPlan } from "../../../common/models/floorplan/floorplan";
import { Table } from "../../../common/models/floorplan/table";
import { FloorplanService } from "../../../services/floorplan.service";
import { CreateFloorplanDialog } from "../../../components/dialogs/create-floorplan-dialog/create-floorplan-dialog";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";

@Component({
	selector: "kt-table-management",
	templateUrl: "./table-management.component.html",
	styleUrls: ["./table-management.component.scss"]
})
export class TableManagementPageComponent extends FloorPlanController
	implements OnInit {
	floorPlanId: string;
	floorplansResponse: any;
	allTables: Array<Table> = [];
	floorplans: Array<any> = [];
	addFloorplan: Array<any> = [];
	title: string;
	enableEdit = false;
	selectedIndex = 0;
	zoomLevel: number;
	floorplanActions: Array<any> = [];

	constructor(
		injector: Injector,
		public dialog: MatDialog,
		private floorPlanSocket: FloorplanService
	) {
		super(injector);
	}

	ngOnInit() {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.SelectedRestaurantId = restaurantId;

			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.SelectedRestaurantId = id;
            }

			this.tableService
				.getFloorplans(this.SelectedRestaurantId)
				.subscribe();
            
			this.tableService.floorPlans.subscribe(floorPlans => {                
				if (floorPlans.length) {
                    this.floorplansResponse = floorPlans;
					floorPlans.map(floorplan => {
						floorplan.Tables.map(tables =>
							this.allTables.push(tables)
						);
                    });
                    
					this.setFloorplan(this.selectedIndex);
					this.setFloorplanActions();
				} else {
					this.createSetupTable("No FloorPlan Setup", "Click the button below to setup your floorplan", "Setup Floorplan", 'floorplan');
				}
			});

			this.floorPlanSocket.getFloorplan().subscribe(floorplan => {
				this.Tables = [];
				this.floorplans = [];
				this.floorplansResponse = floorplan.FloorPlans;
				this.setFloorplan(this.selectedIndex);
			});
		});

		this.floorPlanSocket.setupGet().subscribe(state => {
			if ( state.saveData ) {                
                if(state.saveData === 'floorplan') {
                    this.openFloorPlanDialog();
                } else {
                    this.openAddTableDialog();
                }
			}
		})
	}

	createSetupTable(title: string, text: string, btnText: string, type: string) {
		const emptyTable: Table = new Table();
		emptyTable.emptyFloorPlan = true;
		emptyTable.Seats = 4;
		emptyTable['title'] = title;
		emptyTable['text'] = text;
        emptyTable['btnText'] = btnText;
        emptyTable['type'] = type;
		emptyTable.Position = { x: 0.4, y: 0.15 };
        emptyTable.Size = { width: 250, height: 250 };
        this.Tables.push(emptyTable);
        console.log('createSetupTble!!!!!!!!!!!!!!!!!!!!!!', type);
        
		this.cd.detectChanges();
	}

	setFloorplanActions() {
		const actions = [
			{
				icon: "fa fa-plus",
				text: "Add Table",
				event: "addTable"
			},
			{
				icon: "fa fa-pen",
				text: `Edit Floorplan`,
				event: "editFloorplan"
			},
			{
				icon: "fa fa-trash",
				text: `Delete Floorplan`,
				event: "deleteFloorplan"
			}
		];
		this.floorplanActions = actions;
	}

	handleAction(floorPlan: FloorPlan, event: string) {
		switch (event) {
			case "addTable":
				this.openAddTableDialog();
				break;
			case "editFloorplan":
				this.openFloorPlanDialog(floorPlan);
				break;
			case "deleteFloorplan":
				this.deleteFloorPlan(floorPlan._id);
				break;
		}
	}

	setFloorplan(index: number) {
		if (this.floorplansResponse && this.floorplansResponse.length > 0) {
			this.Tables = [];
			this.floorplans = [];
			this.floorPlanId = this.floorplansResponse[index]._id;
			this.title = this.floorplansResponse[index].Name;
			this.zoomLevel = this.floorplansResponse[index].ZoomLevel;
			localStorage.setItem(
				"floorZoomLevel",
				JSON.stringify(this.zoomLevel)
			);
			for (const floorplan of this.floorplansResponse) {
				this.floorplans.push(floorplan);
			}
			for (const table of this.floorplansResponse[index].Tables) {
				this.Tables.push(table);
            }
            const findIndex = this.floorplans.findIndex(item => item.event === 'addFloorplan');
            if(findIndex < 0) {
                this.floorplans.push({
                    Name: "Add Floorplan",
                    icon: "fa fa-plus",
                    event: "addFloorplan"
                });
            }
            this.selectFloorPlan(this.floorplans[index]);
		}
    }

	openAddTableDialog(table?: Table) {        
		const dialogRef = this.dialog.open(CreateTableDialogComponent, {
			width: "500px",
			data: { table }
		});

		dialogRef.afterClosed().subscribe(response => {
            console.log('dialog closed', response)
			if (response) {
				if (!response.edit) {
                    this.Tables = [];
                    this.addTable(this.floorPlanId, response).then(addTableResponse => {
                        if(!addTableResponse) {
                            return
                        }
                        this.floorplans[this.selectedIndex] = addTableResponse;
                        this.Tables = addTableResponse.Tables;
                        const index = addTableResponse.Tables.findIndex(table => table.TableNr === response.TableNr);
                        this.tableService.generateQrCode(addTableResponse.Tables[index]._id).subscribe();

                        this.auth
                            .updateSetupProgress({
                                RestaurantId: this.auth.getRestaurantId(),
                                updateType: 'FloorPlanSetup'
                            })
                            .subscribe();

                        this.cd.detectChanges();
                    });
				} else {
					this.editTable(response);
				}

				this.cd.detectChanges();
			}
		});
	}

	selectFloorPlan(event) {        
		localStorage.setItem("floorZoomLevel", event.ZoomLevel);
		if (this.enableEdit) {
			this.enableEdit = false;
		}
		if (event.event === "addFloorplan") {
			this.openFloorPlanDialog();
			return;
		}
		this.Tables = [];
		this.title = event.Name;
		this.floorPlanId = event._id;
		this.selectedIndex = this.floorplans.findIndex(
			floorplan => floorplan._id === this.floorPlanId
        );        
        if(!event.Tables.length) {
            this.createSetupTable("No Tables Setup", "Click the button below to setup tables in your floorplan", 'Setup Tables', 'tables');
            return;
        }
        for (const tables of event.Tables) {
            this.Tables.push(tables);
        }
	}

	openFloorPlanDialog(data?: any) {
		const dialogRef = this.dialog.open(CreateFloorplanDialog, {
			width: "500px",
			data: data ? data : null
		});

		dialogRef.afterClosed().subscribe(floorplanResp => {
			const floorPlan: FloorPlan = {
				Name: floorplanResp.Name,
				RestaurantId: this.auth.getRestaurantId(),
				ZoomLevel: this.zoomLevel,
				DisabledReservation: floorplanResp.DisabledReservation,
				Tables: floorplanResp.Tables ? floorplanResp.Tables : []
			};
			if (floorplanResp.action === "add") {
				this.tableService
					.addFloorPlan(floorPlan)
					.subscribe(response => {
                        if(!response) {
                            return
                        }
						this.floorplans.splice(
							this.floorplans.length - 1,
							0,
							response.data
                        );

                        this.floorPlanId = response.data._id;
                        this.Tables = [];
                        this.floorplansResponse = this.floorplans;
                        const index = this.floorplans.findIndex(item => item._id === this.floorPlanId);
                        this.selectedIndex = index;
                        this.setFloorplan(this.selectedIndex);
                        this.openAddTableDialog();
					});
			} else if (floorplanResp.action === "edit") {
				this.tableService
					.updateFloorPlan(floorplanResp)
					.subscribe(response => {
                        const index = this.floorplans.findIndex(item => item._id === response.data._id);
                        this.floorplans[index] = response.data;
                        this.title = response.data.Name;
                        this.cd.detectChanges();
					});
			}
		});
	}

	editStatus() {
		this.enableEdit = this.enableEdit ? false : true;
		this.tableService.enableEdit.next(this.enableEdit);
	}

	deleteFloorPlan(floorPlanId) {
		const _title: string = "Delete Floorplan";
		const _description: string =
			"Are you sure to permanently delete this Floorplan?";
		const _waitDesciption: string = "Floorplan is deleting...";

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.tableService
				.deleteFloorPlan(floorPlanId)
				.subscribe(response => {
					const index = this.floorplansResponse.findIndex(
						e => e._id === response.data._id
                    );                    
					index > -1 ? this.floorplansResponse.splice(index, 1) : null;
                    this.selectedIndex = 0;
                    this.setFloorplan(this.selectedIndex);
					const deleteMessage = `You have deleted ${response.data.Name}`;
					this.layoutUtilsService.showActionNotification(
						deleteMessage,
                        MessageType.Delete,
                        10000,
                        false
					);
				});
		});
	}

	saveFloor(event) {
		this.Tables = [];

		for (const i of event) {
			this.Tables.push(i);
		}

		const floorPlan = new FloorPlan();
		floorPlan._id = this.floorPlanId;
		floorPlan.ZoomLevel = event.ZoomLevel;
		floorPlan.RestaurantId = this.SelectedRestaurantId;
		floorPlan.Name = this.title;
		floorPlan.Tables = this.Tables;

		const foundIndex = this.floorplans.findIndex(
			x => x._id === floorPlan._id
		);
		this.floorplans.splice(foundIndex, 1, floorPlan);
        console.log('SAVE FLOORPLAN', floorPlan)
		this.updateFloorPlan(floorPlan);
	}
}
