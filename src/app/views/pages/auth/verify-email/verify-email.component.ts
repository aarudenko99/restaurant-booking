import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService, AuthNoticeService } from "../../../../core/auth";

@Component({
	selector: "mm-verify-email",
	templateUrl: "./verify-email.component.html",
	styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent implements OnInit {
	verified: boolean;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private authNoticeService: AuthNoticeService
	) {}

	ngOnInit() {
		const userId = this.route.snapshot.paramMap.get("id");
		this.authService.verifyEmail(userId).subscribe(response => {
			if (response && response.status === 200) {
				this.verified = true;
				console.log(response, this.verified);
			} else {
				this.verified = false;
				this.authNoticeService.setNotice(
					"Something went wrong while verifying your email try again!",
					"danger"
				);
			}
			this.cd.detectChanges();
		});
	}
}
