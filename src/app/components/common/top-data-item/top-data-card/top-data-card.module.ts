import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TopDataCardComponent } from "./top-data-card.component";
import { PartialsModule } from "../../../../views/partials/partials.module";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
	declarations: [TopDataCardComponent],
	imports: [
		CommonModule,
		MatCardModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		InlineSVGModule
	],
	exports: [TopDataCardComponent]
})
export class TopDataCardModule {}
