import {
	Component,
	OnInit,
	Injector,
	Input,
	AfterViewInit
} from "@angular/core";
import { Table } from "../../../common/models/floorplan/table";
import { TableService } from "../../../services/table.service";
import { Reservations } from "../../../common/models/reservations";
import { ReservationController } from "../../../controllers/reservation/reservation.controller";

@Component({
	selector: "mm-reservation-manage-list",
	templateUrl: "./reservation-manage-list.component.html",
	styleUrls: ["./reservation-manage-list.component.scss"]
})
export class ReservationManageListComponent extends ReservationController
	implements OnInit, AfterViewInit {
	@Input() Tables: Array<Table>;
	@Input() vacantTables: Array<any>;

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	selectedTableId: string;
	tableModel: Table;
	tableService: TableService;
	displayedColumns: Array<any> = [
		"TableReservationDate",
		"date",
		"name",
		"action"
	];
	menuItems: Array<any> = [];

	constructor(injector: Injector) {
		super(injector);
		this.tableService = this.injector.get(TableService);
	}

	// ngOnChanges(changes: SimpleChanges): void {
	// 	if (changes.vacantTables.currentValue) {
	// 		const vacantTables = changes.vacantTables.currentValue;
	// 		vacantTables.map(table => {
	// 			console.log(table);
	// 			this.getTableName(table._id);
	// 			this.menuItems.push({
	// 				icon: "flaticon2-link",
	// 				id: table._id,
	// 				text: table.Name
	// 			});
	// 		});
	// 	}
	// }

	ngOnInit() {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
            this.SelectedRestaurantId = restaurantId
                ? restaurantId
                : this.auth.getRestaurantId();
            
            if (this.SelectedRestaurantId) {
                this.getUpcomingReservations().then(reservations => {
                    console.log(reservations);
                });
            }
		})
	}

	ngAfterViewInit(): void {
		this.reservations.sort = this.sort;
		this.reservations.paginator = this.paginator;
		console.log(this.reservations.data);
	}

	assignTable(id: string, reservation: Reservations) {
		if (reservation.TableId) {
			console.log("Has already an assigned table", reservation);
		}
		console.log("ID", id, reservation);

		const reservationId = reservation.TableId;
		// Helpers.setLoading(true);
		reservation.TableId = id;
		this.tableService.updateReservedTable(reservation).subscribe(
			data => {
				console.log("UPDATED!!!!!!!!!!!!!!!!!", data);

				this.tableModel = new Table();
				this.tableModel._id = reservationId;
				this.tableModel.TableStatus = "Vacant";
				// this.tableService.updateStatus(this.tableModel).subscribe(
				// 	status => {
				// 		console.log(status);
				// 		this.loadTables();
				// 		this.loadReservedTables();
				// 		Helpers.setLoading(false);
				// 	},
				// 	error => {
				// 		Helpers.setLoading(false);
				// 	}
				// );
			},
			error => {
				// Helpers.setLoading(false);
			}
		);
	}

	// getTableName(id) {
	//     console.log(this.vacantTables.filter(table => table._id === id)[0]);
	//     if (this.Tables != undefined) {
	//         var table = this.Tables.filter(table => table._id === id)[0];
	//         if (table != null && table != undefined)
	//             return table.Name;
	//     }
	// }
}
