import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/auth";
import { MatDialogRef } from "@angular/material";

@Component({
	selector: "mm-avg-dialog",
	templateUrl: "./avg-dialog.component.html",
	styleUrls: ["./avg-dialog.component.scss"]
})
export class AvgDialogComponent implements OnInit {
	avgSteps = [
		{
			img: "./assets/media/avg/avg-1.svg",
			title: "Wat verzamelt Mijn Menu?",
			message:
				"Gegevens die worden verzameld zijn bijvoorbeeld informatie over jouw surf- en kijkgedrag en jouw locatie."
		},
		{
			img: "./assets/media/avg/avg-2.svg",
			title: "Wat doet Mijn Menu met de gegevens?",
			message:
				"Gegevens die worden verzameld zijn bijvoorbeeld informatie over jouw surf- en kijkgedrag en jouw locatie."
		},
		{
			img: "./assets/media/avg/avg-3.svg",
			title: "Met wie deelt Mijn Menu de gegevens?",
			message:
				"Gegevens die worden verzameld zijn bijvoorbeeld informatie over jouw surf- en kijkgedrag en jouw locatie."
		},
		{
			img: "./assets/media/avg/avg-4.svg",
			title: "Wat verzamelt Mijn Menu?",
			message:
				"Gegevens die worden verzameld zijn bijvoorbeeld informatie over jouw surf- en kijkgedrag en jouw locatie."
		}
	];

	constructor(
		public dialogRef: MatDialogRef<AvgDialogComponent>,
		private auth: AuthService
	) {}

	ngOnInit() {}

	acceptAvg() {
		const body = { avgAccepted: true };
		this.auth
			.setAvgAccepted(this.auth.getUserId(), body)
			.subscribe(response => {
				if (response.status === 200) {
					const currentUser = this.auth.currentUserValue;
					currentUser.avgAccepted = true;
					this.auth.currentUserSubject.next(currentUser);
					const user = JSON.parse(
						localStorage.getItem("currentUser")
					);
					user.data = response.data;
					localStorage.setItem("currentUser", JSON.stringify(user));
					this.dialogRef.close();
				}
			});
	}
}
