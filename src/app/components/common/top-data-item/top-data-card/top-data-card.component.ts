import {
	Component,
	OnInit,
	Input,
	SimpleChanges,
	ChangeDetectorRef
} from "@angular/core";

@Component({
	selector: "mm-top-data-card",
	templateUrl: "./top-data-card.component.html",
	styleUrls: ["./top-data-card.component.scss"]
})
export class TopDataCardComponent implements OnInit {
	@Input() data;

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {}
}
