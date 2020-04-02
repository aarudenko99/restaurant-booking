import {
	Component,
	OnInit,
	Input,
	HostListener,
	Output,
	EventEmitter,
	ViewChild,
	ViewChildren,
} from "@angular/core";
import { Table } from "../../../common/models/floorplan/table";
import { TableComponent } from "../table/table.component";

@Component({
	selector: "mm-floor-plan",
	templateUrl: "./floor-plan.component.html",
	styleUrls: ["./floor-plan.component.scss"]
})
export class FloorPlanComponent implements OnInit {
	@Input() id: string;
	@Input() tables: Array<Table>;
	@Input() enableEdit: boolean;
	@Input() zoomLevel: number = null;

	@Output() close = new EventEmitter<Table>();
	@Output() edit = new EventEmitter<Table>();
	@Output() saveFloor = new EventEmitter();
	@ViewChildren("tableComp") tableComp: TableComponent;

    closeResult: string;
    hideSetupTable: boolean = false;
	display: string;
	dimensions = false;
	containerSize = 0;
	countTables = 0;
	newFloor = [];
	zoomout: boolean;

    constructor() {}

	ngOnInit() {
        this.calculateDimension();
        this.getOrSetZoomLevel();
    }
    
    getOrSetZoomLevel() {                
        if(localStorage.getItem("floorZoomLevel") !== 'undefined') {
            this.zoomLevel = JSON.parse(localStorage.getItem("floorZoomLevel"));
        } else {
            this.zoomLevel = 10;
        }
        localStorage.setItem(
            "floorZoomLevel",
            JSON.stringify(this.zoomLevel)
        );
    }

	calculateDimension() {
		this.containerSize = document.getElementById("container").offsetWidth;
		document.documentElement.style.setProperty(
			"--floor-height",
			this.containerSize / 1.7 + "px"
		);
	}

	zoom(criteria: string) {
        this.zoomLevel = JSON.parse(localStorage.getItem("floorZoomLevel"));
		if (criteria === "zoomOut") {
			if (this.zoomLevel > 10) {
				this.zoomLevel -= 10;
				localStorage.setItem(
					"floorZoomLevel",
					this.zoomLevel.toString()
				);
				this.setZoom(criteria);
			}
		} else {
			if (this.zoomLevel < 80) {
				this.zoomLevel += 10;
				localStorage.setItem(
					"floorZoomLevel",
					this.zoomLevel.toString()
				);
				this.setZoom(criteria);
			}
		}
	}

	setZoom(criteria) {
		this.tableComp["_results"].forEach(tableComponent => {
			tableComponent[criteria]();
		});
	}

	@HostListener("window:resize", ["$event"])
	onResize() {
		this.calculateDimension();
	}

	deleteTable(event) {
		this.close.emit(event);
	}

	editTable(event) {
		this.edit.emit(event);
	}

	updateTable(event) {
		this.countTables++;
		this.newFloor.push(event);
		this.newFloor["ZoomLevel"] = this.zoomLevel;
		console.log("NEW FLOOOR", this.newFloor);
		if (this.newFloor.length === this.tables.length) {
			this.saveFloor.emit(this.newFloor);
			this.tables = [];
			this.newFloor = [];
			this.countTables = 0;
		}
	}
}
