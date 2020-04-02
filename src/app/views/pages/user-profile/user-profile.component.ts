import { Component, OnInit, Injector } from "@angular/core";
import { User } from "../../../core/auth";
import { BehaviorSubject } from "rxjs";
import { AbstractController } from "../../../controllers/abstract/abstract.controller";

@Component({
	selector: "mm-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"]
})
export class UserProfilePageComponent extends AbstractController
	implements OnInit {
	navItem: string;
	edit: boolean;
	userSubject = new BehaviorSubject<User>(new User());

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {
		const currentUser = this.auth.getCurrentUser();
		this.userSubject.next(currentUser.data);
		this.navItem = "personal-info";
	}

	selectedNav(navItem) {
		this.navItem = navItem;
	}
}
