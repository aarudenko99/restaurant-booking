import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User, AuthService } from "../../../core/auth";

@Component({
	selector: "mm-user-profile-aside",
	templateUrl: "./user-profile-aside.component.html",
	styleUrls: ["./user-profile-aside.component.scss"]
})
export class UserProfileAsideComponent implements OnInit {
	@Input() selected: string;
	@Input() user: User;
	@Output() selectedNavItem = new EventEmitter<string>();
	activeNavItem: string = "profile-overview";

	constructor(public auth: AuthService) {}

	ngOnInit() {
		this.activeNavItem = this.selected;
	}

	navSelected(navItem: string) {
		this.activeNavItem = navItem;
		this.selectedNavItem.emit(navItem);
	}
}
