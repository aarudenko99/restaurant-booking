import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ViewChild
} from "@angular/core";
import { MatDatepicker } from "@angular/material";
import moment from "moment";

@Component({
	selector: "mm-graph-date-filter",
	templateUrl: "./graph-date-filter.component.html",
	styleUrls: ["./graph-date-filter.component.scss"]
})
export class GraphDateFilterComponent implements OnInit {
	@ViewChild("picker", { static: true }) picker: MatDatepicker<any>;
	@Input() selectedFilter: string;
	@Output() filterSelected = new EventEmitter<any>();
	currentFilter: string;
	minDate: Date;
	maxDate: Date;

	constructor() {
		this.minDate = new Date(2000, 0, 1);
		this.maxDate = new Date(2020, 0, 1);
	}

	ngOnInit() {
		this.currentFilter = moment(new Date(), "YYYY/MM/DD").format("MMMM");
	}

	chosenMonthHandler(date: Date) {
		this.currentFilter = moment(date, "YYYY/MM/DD").format("MMMM");
		if (this.selectedFilter !== "daily") {
			this.picker.close();
		}
		this.filterSelected.emit(moment(date).format("YYYY-MM-DD"));
	}

	chosenDayHandler(date: Date) {
		this.currentFilter = moment(date, "YYYY/MM/DD").format("DD MMMM");
		this.filterSelected.emit(moment(date).format("YYYY-MM-DD"));
	}
}	 
