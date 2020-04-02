import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "mm-empty-table",
	templateUrl: "./empty-table.component.html",
	styleUrls: ["./empty-table.component.scss"]
})
export class EmptyTableComponent implements OnInit {
	@Input() type: string;
	@Input() message: string;
	@Input() titles: Array<any>;
	@Input() displayedColumns: Array<string>;
	@Output() createMenu = new EventEmitter<any>();
	dataSourceEmpty = [];

	constructor() {}

	ngOnInit() {}
}
