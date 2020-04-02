import {
	Component,
	OnInit,
	Input,
	HostListener,
	AfterViewInit,
	Output,
	EventEmitter,
	ChangeDetectorRef
} from "@angular/core";
import { Table } from "../../../common/models/floorplan/table";
import { TableService } from "../../../services/table.service";
import { FloorplanService } from "../../../services/floorplan.service";
import { rectangleChairsFunction } from "./calculate-functions/rectangle-chairs-position";
import { BillService } from "../../../services/bill.service";
import { MatDialog } from "@angular/material";
import { TableBillComponent } from "../../dialogs/table-bill/table-bill.component";
import { MessageType, LayoutUtilsService } from "../../../core/_base/crud";
import { QrCodeComponent } from "../../common/qr-code/qr-code.component";

@Component({
	selector: "mm-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, AfterViewInit {
	@Input() table: Table;
	@Input() floorSize: number;
	@Input() elementIndex: number;
	@Input() editFloorplan: boolean;
	@Output() close = new EventEmitter<any>();
	@Output() edit = new EventEmitter<Table>();
	@Output() save = new EventEmitter();

	seats: number;
	rotate: number;
	round: any;
	el: any;

	x: number;
	y: number;
	width: number;
	height: number;
	chairWidth: number;
	chairHeight: number;
	tableInnerSize: number;
	fontSize: number;
	statusFontSize: number;
	draggingTable: boolean;
	changePercent: number;
	chairRound: any;
	position = 0;
	startSize: any;
	border = 33;
	rectangleIndex = 0;
	m_mouse_x = 0;
	m_mouse_y = 0;
	degree = 0;

	constructor(
		public tableService: TableService,
		private billService: BillService,
		private floorPlanService: FloorplanService,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef,
		private layoutUtilsService: LayoutUtilsService
	) {
		this.x = 0;
		this.y = 0;
		this.draggingTable = false;
	}

	ngOnInit() {
		localStorage.setItem("floorSize", JSON.stringify(this.floorSize));
		this.tableService.enableEdit.subscribe(edit => {
			this.el.style.cursor = true ? "move" : "default";
			if (!edit) {
                console.log(this.table.Size, this.height, this.width);
                
				this.save.emit({
					_id: this.table._id,
					TableNr: this.table.TableNr,
					Position: {
						rotation: this.degree,
						x: this.x / this.floorSize,
						y: this.y / this.floorSize
					},
					CheckInDateTime: this.table.CheckInDateTime,
					Name: this.table.Name,
					Status: this.table.Status,
					Seats: this.table.Seats,
					Shape: this.table.Shape,
					SeatsOccupied: this.table.SeatsOccupied,
					Size: { width: this.width, height: this.height },
					DisabledReservation: this.table.DisabledReservation,
					InstantPayment: this.table.InstantPayment
				});
			}
		});
		this.tableConfig();
	}

	ngAfterViewInit(): void {
		this.el = document.getElementById(this.elementIndex.toString());
		this.x = this.el.offsetLeft;
		this.y = this.el.offsetTop;
	}

	tableConfig() {
		this.x = this.floorSize * this.table.Position["x"];
		this.y = this.floorSize * this.table.Position["y"];
		this.degree = this.table.Position["rotation"]
			? this.table.Position["rotation"]
			: 0;
		this.startSize = this.floorSize;

		this.width = this.table.Size.width;
        this.height = this.table.Size.height;
		this.round = this.width;
        this.seats = +this.table.Seats;

		if (this.table.Shape === "round") {
			this.border = this.width;
			this.rotate = 360 / this.seats;
		} else if (this.table.Shape === "square") {
			this.border = this.width / 6;
			this.rotate = 90;
		} else if (this.table.Shape === "rectangle") {
			this.border = this.width / 6;

			// this.width = (this.floorSize / 100) * 12;
			// this.height =
			// 	(this.floorSize / 100) * 12 * 1.5 * (+this.table.Seats / 6);
			if ((+this.table.Seats - 2) % 4 === 0) {
				this.rectangleIndex = ((this.floorSize / 100) * 12) / 2.5 / 1.5;
			}
		}
		console.log(this.table);
		document.documentElement.style.setProperty(
			"--border",
			this.border.toString() + "px"
		);
		this.chairRound = this.height / 2;
		this.chairHeight = !this.table.emptyFloorPlan
			? ((this.floorSize / 100) * 12) / 2.5
			: ((this.floorSize / 100) * 12) / 1.5;
		this.chairWidth = !this.table.emptyFloorPlan
			? ((this.floorSize / 100) * 12) / 2.5
			: ((this.floorSize / 100) * 12) / 1.5;
		this.tableInnerSize = !this.table.emptyFloorPlan
			? ((((this.floorSize / 100) * 12) / 100) * 65) / 4
			: ((((this.floorSize / 100) * 12) / 100) * 65) / 6;
		this.fontSize = !this.table.emptyFloorPlan
			? ((((this.floorSize / 100) * 12) / 100) * 65) / 6
			: ((((this.floorSize / 100) * 12) / 100) * 65) / 7;
		this.statusFontSize = ((((this.floorSize / 100) * 12) / 100) * 65) / 8;
	}

	rectangleChairs(index: number) {
		return rectangleChairsFunction(
			index,
			typeof this.table.Seats === "string"
				? +this.table.Seats
				: this.table.Seats,
			this.floorSize,
			this.rectangleIndex,
			this.width,
			this.height,
			this.table
		);
	}

	countSeats(i: number): Array<number> {
		return new Array(i);
	}

	area() {
		return this.width * this.height;
	}

	zoomOut() {

		const zoomLevel = JSON.parse(localStorage.getItem("floorZoomLevel"));
		this.chairHeight = this.chairHeight - 5;
		this.chairWidth = this.chairWidth - 5;
		this.tableInnerSize = this.tableInnerSize - 2;
		this.fontSize = this.fontSize - 2;
			
		if (this.table.Shape === "rectangle") {

            this.chairHeight = this.chairHeight - 1;
            this.chairWidth = this.chairWidth - 1;
            this.height = this.height * 0.9;
            this.width = this.width * 0.9;

		} else {
			this.height = 113 * (1 + zoomLevel / 100);
			this.width = 113 * (1 + zoomLevel / 100);
		}
	}

	zoomIn() {
		const zoomLevel = JSON.parse(localStorage.getItem("floorZoomLevel"));
		this.chairHeight = this.chairHeight + 5;
		this.chairWidth = this.chairWidth + 5;
		this.tableInnerSize = this.tableInnerSize + 2;
		this.fontSize = this.fontSize + 2;

		

		if (this.table.Shape === "rectangle") {

            this.chairHeight = this.chairHeight + 1;
            this.chairWidth = this.chairWidth + 1;
			this.height = this.height * 1.1;
			this.width = this.width * 1.1;
			
		} else {
			this.width = 113 * (1 + zoomLevel / 100);
			this.height = 113 * (1 + zoomLevel / 100);
		}
	}

	calculateTableDimension() {
		this.changePercent =
			(this.el.offsetParent.clientWidth - 20) / this.startSize;

		this.width = this.width * this.changePercent;
		this.height = this.height * this.changePercent;
		this.x = (this.x - 12) * this.changePercent + 12;
		this.y = this.y * this.changePercent;
		this.border =
			this.table.Shape === "round" ? this.width : this.width / 6;

		this.startSize = this.floorSize;
	}

	onTableClick(event: MouseEvent) {
		if (this.editFloorplan) {
			this.draggingTable = true;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	rotate45() {
		if (this.degree !== 360) {
			this.degree += 45;
		} else {
			this.degree = 0;
		}
	}

	editTable() {
		this.edit.emit(this.table);
	}

	deleteTable() {
		this.close.emit({ index: this.elementIndex, _id: this.table._id });
	}

	getMoreBtnOffset(tableShape: string) {
		return tableShape !== "round" ? 8 : 15;
	}

	getTableQrCode(table: Table) {
		this.dialog.open(QrCodeComponent, {
			width: "50%",
			panelClass: "",
			data: { table: table }
		});
	}

	getTableBill(table) {
		this.billService
			.getTableBill(table.CheckInReservationCode)
			.subscribe(tableBill => {
				const dialogRef = this.dialog.open(TableBillComponent, {
					width: "600px",
					panelClass: "table-bill-dialog",
					data: { bill: tableBill.data }
				});

				dialogRef.afterClosed().subscribe(result => {
					console.log("The dialog was closed", result);
				});
			});
	}

	checkoutTable(table: Table) {
		this.tableService
			.checkOutTable(table.CheckInReservationCode)
			.subscribe(response => {
				console.log(response.data);

				const floorPlans = this.tableService.tempPlans;
				const index = floorPlans.findIndex(
					e => e._id === response.data._id
				);
				floorPlans[index] = response.data;
				this.tableService.floorPlans.next(floorPlans);

				const updateMessage = `You checked out reservation code:  #${this.table.CheckInReservationCode}`;
				this.layoutUtilsService.showActionNotification(
					updateMessage,
					MessageType.Update
				);
				this.cd.detectChanges();
			});
	}

	@HostListener("document:mousemove", ["$event"])
	onDragTable(event: MouseEvent) {
		const chairSize = ((this.floorSize / 100) * 12) / 2.5 / 2;

		if (this.draggingTable) {
			if (this.m_mouse_x < event.clientX) {
				this.x +=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(this.m_mouse_x - event.clientX, 2)
								)
						  );
				if (
					this.x + this.width + 12 >
					this.el.offsetParent.clientWidth - chairSize
				) {
					this.x -=
						this.x +
						12 +
						this.width -
						this.el.offsetParent.clientWidth +
						chairSize;
				}
			} else if (this.m_mouse_x > event.clientX) {
				this.x -=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(this.m_mouse_x - event.clientX, 2)
								)
						  );
				if (this.el.offsetLeft - 13 < 1 + chairSize) {
					this.x = 12 + chairSize;
				}
			}

			let border = 0;
			if (this.degree === 45 || this.degree === 135) {
				border = this.height / 4;
			} else if (this.degree === 90 || this.degree === 270) {
				border = this.height / 3;
			}

			if (this.m_mouse_y < event.clientY) {
				this.y +=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(this.m_mouse_y - event.clientY, 2)
								)
						  );
				if (
					this.y + this.height - border >
					this.el.offsetParent.clientHeight - chairSize
				) {
					this.y -=
						this.y +
						this.height -
						border -
						this.el.offsetParent.clientHeight +
						chairSize;
				}
			} else if (this.m_mouse_y > event.clientY) {
				this.y -=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(this.m_mouse_y - event.clientY, 2)
								)
						  );
				if (this.el.offsetTop + border < 1 + chairSize) {
					this.y = -border + chairSize;
				}
			}
			this.position++;
			this.m_mouse_x = event.clientX;
			this.m_mouse_y = event.clientY;
		}
	}

	@HostListener("document:mouseup", ["$event"])
	@HostListener("document:contextmenu", ["$event"])
	@HostListener("touchend", ["$event"])
	onCornerRelease() {
		this.draggingTable = false;
		this.position = 0;
	}

	@HostListener("window:resize", ["$event"])
	onResize() {
		this.calculateTableDimension();
	}

	@HostListener("touchstart", ["$event"])
	onTouchClick(event: TouchEvent) {
		if (this.editFloorplan) {
			this.draggingTable = true;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	@HostListener("touchmove", ["$event"])
	onTouchMove(event: TouchEvent) {
		var touchLocation = event.targetTouches[0];
		const chairSize = ((this.floorSize / 100) * 12) / 2.5 / 2;

		if (this.draggingTable) {
			if (this.m_mouse_x < touchLocation.clientX) {
				this.x +=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(
										this.m_mouse_x - touchLocation.clientX,
										2
									)
								)
						  );
				if (
					this.x + this.width + 12 >
					this.el.offsetParent.clientWidth - chairSize
				) {
					this.x -=
						this.x +
						12 +
						this.width -
						this.el.offsetParent.clientWidth +
						chairSize;
				}
			} else if (this.m_mouse_x > touchLocation.clientX) {
				this.x -=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(
										this.m_mouse_x - touchLocation.clientX,
										2
									)
								)
						  );
				if (this.el.offsetLeft - 13 < 1 + chairSize) {
					this.x = 12 + chairSize;
				}
			}

			let border = 0;
			if (this.degree === 45 || this.degree === 135) {
				border = this.height / 4;
			} else if (this.degree === 90 || this.degree === 270) {
				border = this.height / 3;
			}

			if (this.m_mouse_y < touchLocation.clientY) {
				this.y +=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(
										this.m_mouse_y - touchLocation.clientY,
										2
									)
								)
						  );
				if (
					this.y + this.height - border >
					this.el.offsetParent.clientHeight - chairSize
				) {
					this.y -=
						this.y +
						this.height -
						border -
						this.el.offsetParent.clientHeight +
						chairSize;
				}
			} else if (this.m_mouse_y > touchLocation.clientY) {
				this.y -=
					this.position < 1
						? 1.4
						: Math.round(
								Math.sqrt(
									Math.pow(
										this.m_mouse_y - touchLocation.clientY,
										2
									)
								)
						  );
				if (this.el.offsetTop + border < 1 + chairSize) {
					this.y = -border + chairSize;
				}
			}
			this.position++;
			this.m_mouse_x = touchLocation.clientX;
			this.m_mouse_y = touchLocation.clientY;
		}
	}

	setTable(type) {
		this.floorPlanService.setupSet(type);
	}
}
