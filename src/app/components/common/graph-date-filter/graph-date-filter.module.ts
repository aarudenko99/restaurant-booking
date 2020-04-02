import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Translation
import { TranslateModule } from "@ngx-translate/core";
import {
	MatDatepickerModule,
	MatInputModule,
	MatNativeDateModule
} from "@angular/material";

import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { GraphDateFilterComponent } from "./graph-date-filter.component";

@NgModule({
	declarations: [GraphDateFilterComponent],
	exports: [GraphDateFilterComponent],
	imports: [
		FormsModule,
		CommonModule,
		TranslateModule,
		MatDatepickerModule,
		MatInputModule,
		MatNativeDateModule,
		NgbTooltipModule
	]
})
export class GraphDateFilterModule {}
