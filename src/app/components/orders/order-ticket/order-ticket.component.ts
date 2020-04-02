import {
	Component,
	OnInit,
	Input,
	Injector,
	ChangeDetectorRef
} from "@angular/core";
import { TableOrder } from "../../../common/models/orders/table-order";
import { LiveOrderService } from "../../../services/live-order.service";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { EditTableOrderComponent } from "../../dialogs/edit-table-order/edit-table-order.component";

@Component({
	selector: "mm-order-tickets",
	templateUrl: "./order-ticket.component.html",
	styleUrls: ["./order-ticket.component.scss"]
})
export class OrderTicketComponent extends AbstractController implements OnInit {
	@Input() tableOrders: Array<TableOrder>;
	selectOrder = {};
	role: string;
	orderMenuItems: Array<any> = [
		{
			icon: "flaticon2-download",
			text: "Received"
		},
		{
			icon: "fa fa-hourglass-start",
			text: "Prepared"
		},
		{
			icon: "fa fa-concierge-bell",
			text: "Serving"
		},
		{
			icon: "flaticon2-check-mark",
			text: "Done"
		}
	];

	constructor(
		injector: Injector,
		private liveOrderSocket: LiveOrderService,
		private cd: ChangeDetectorRef
	) {
		super(injector);
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			this.liveOrderSocket.connect(restaurantId).subscribe(connected => {
				console.log("connected", connected);
			});
		});
	}

	ngOnInit() {
		this.role = this.auth.getUserRole();
		this.liveOrderSocket.getLiveOrders().subscribe(tableOrders => {
			console.log("GET LIVE ORDERS", tableOrders);
			this.tableOrders = tableOrders.data;
			this.cd.detectChanges();
		});
	}

	// onTap(i) {
	//     if (this.tableOrders[i].tap === undefined) {
	//         this.tableOrders[i].tap = 1;
	//     } else if (this.tableOrders[i].tap < 2) {
	//         this.tableOrders[i].tap = this.tableOrders[i].tap + 1;
	//     }
	//     if (!!this.tableOrders[i].tap) {
	//         const status = this.tableOrders[i].OrderStatus;
	//         if (this.tableOrders[i].tap === 2) {
	//         if (status === 'Received') {
	//             this.updateReservationStatus(this.tableOrders[i] , 'Prepared');
	//             this.tableOrders[i].OrderStatus = 'Prepared';
	//         }
	//         if (status === 'Prepared') {
	//             this.updateReservationStatus(this.tableOrders[i] , 'Serving');
	//             this.tableOrders[i].OrderStatus = 'Serving';
	//         }
	//         if (status === 'Serving') {
	//             this.updateReservationStatus(this.tableOrders[i] , 'done');
	//         }
	//         }
	//     }
	// }

	changeStatus(tableOrder: TableOrder, status: string) {
		this.liveOrderSocket.updateOrderStatus(tableOrder._id, status);
		this.liveOrderSocket.orderStatus.subscribe(response => {
			if (tableOrder._id === response.statusUpdate._id) {
				tableOrder.OrderStatus = response.statusUpdate.title;
				this.cd.detectChanges();
			}
		});
	}

	editOrder(tableOrder: TableOrder) {
		const dialogRef = this.dialog.open(EditTableOrderComponent, {
			width: "50%",
			panelClass: "kt-portlet-dialog",
			data: { tableOrder }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log(result);
			}
		});
	}
}
