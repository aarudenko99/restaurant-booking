// Angular
import {
	Component,
	Input,
	Output,
	ViewChild,
	EventEmitter
} from "@angular/core";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";

/**
 * Sample context menu dropdown
 */
@Component({
	selector: "kt-context-menu",
	templateUrl: "./context-menu.component.html",
	styleUrls: ["./context-menu.component.scss"]
})
export class ContextMenuComponent {
	@Input() menuItems: Array<any>;
	@Output() menuItemClicked = new EventEmitter();
	// @ViewChild(NgbDropdown, {static: true}) dropdown: NgbDropdown;

	itemClicked(item) {
		console.log(item);
		this.menuItemClicked.emit(item);
		// this.dropdown.close();
	}
}
