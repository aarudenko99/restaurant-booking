import { Component, OnInit, Injector } from "@angular/core";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "kt-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"]
})
export class MenuPageComponent extends AbstractController implements OnInit {
	auth: AuthService;

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {}
}
