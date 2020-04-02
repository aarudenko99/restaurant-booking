import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
	MatIconModule,
	MatButtonModule,
	MatCardModule,
	MatListModule,
	MatPaginatorModule
} from "@angular/material";
import { PartialsModule } from "../../views/partials/partials.module";
import { ReviewItemsComponent } from "./review-items/review-items.component";
import { EmptyTableComponentsModule } from "../common/empty-table/empty-table.module";
import { NgbDropdownModule, NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [ReviewItemsComponent],
	exports: [ReviewItemsComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		MatPaginatorModule,
		NgbDropdownModule,
		NgbRatingModule,
		TranslateModule,
		EmptyTableComponentsModule
	]
})
export class ReviewsModule {}
