import { Component, OnInit, Injector, Input } from "@angular/core";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";

@Component({
	selector: "mm-setup-steps",
	templateUrl: "./setup-steps.component.html",
	styleUrls: ["./setup-steps.component.scss"]
})
export class SetupStepsComponent extends AbstractController implements OnInit {
	@Input() setupSteps: object;

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {}
}
