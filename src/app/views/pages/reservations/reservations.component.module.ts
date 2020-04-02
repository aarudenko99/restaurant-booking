// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Pages
import { ReservationPageComponent } from "./reservations.component";
// Components
import { PartialsModule } from "../../partials/partials.module";
import { ReservationComponentModule } from "../../../components/reservations/reservation.module";
import { MatIconModule, MatButtonModule } from "@angular/material";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
	declarations: [ReservationPageComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		ReservationComponentModule,
		MatIconModule,
		MatButtonModule,
		InlineSVGModule
	],
	providers: []
})
export class ReservationModule {}
