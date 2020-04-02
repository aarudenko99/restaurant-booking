// Angular
import {
	Component,
	ContentChild,
	Input,
	OnInit,
	TemplateRef
} from "@angular/core";

// Layout
import { LayoutConfigService } from "../../../../../core/_base/layout";
import { User } from "../../../../../core/auth";

@Component({
	selector: "kt-widget4",
	templateUrl: "./widget4.component.html",
	styleUrls: ["./widget4.component.scss"]
})
export class Widget4Component implements OnInit {
	// Public properties
	@Input() data: Array<User>;

	@ContentChild("actionTemplate", { static: true })
	actionTemplate: TemplateRef<any>;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {}
}
