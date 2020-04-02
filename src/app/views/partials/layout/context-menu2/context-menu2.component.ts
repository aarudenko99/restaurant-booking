// Angular
import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	SimpleChanges
} from "@angular/core";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";

/**
 * Sample context menu dropdown
 */
@Component({
	selector: "kt-context-menu2",
	templateUrl: "./context-menu2.component.html",
	styleUrls: ["./context-menu2.component.scss"]
})
export class ContextMenu2Component {
	@Input() title: any;
	@Input() menuItems: Array<any>;
	@Input() class: string;
	@Input() toolTip: string;
	@Output() menuItemClicked = new EventEmitter();
	@ViewChild(NgbDropdown, { static: true }) dropdown: NgbDropdown;

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

	itemClicked(item) {
		// this.dropdown.close();
		this.menuItemClicked.emit(item);
	}
}
