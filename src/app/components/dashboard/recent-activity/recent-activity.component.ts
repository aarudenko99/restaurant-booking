import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RecentActivityService } from "../../../services/recent-activity.service";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "mm-recent-activity",
	templateUrl: "./recent-activity.component.html",
	styleUrls: ["./recent-activity.component.scss"]
})
export class RecentActivityComponent implements OnInit {
	recentActivities: Array<any> = [];

	constructor(
		private auth: AuthService,
		private cd: ChangeDetectorRef,
		private recentActivityService: RecentActivityService
	) {}

	ngOnInit() {
		this.recentActivityService
			.connect(this.auth.getRestaurantId())
			.subscribe();

		this.recentActivityService.getRecentActivity().subscribe(response => {
			console.log("RECENT ACTIVITY", response);
			this.recentActivities = response.Recent_Activity;
			this.cd.detectChanges();
		});
	}
}
