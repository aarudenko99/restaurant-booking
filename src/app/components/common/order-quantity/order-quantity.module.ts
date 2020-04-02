import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrderQuantityComponent } from "./order-quantity.component";
import { PartialsModule } from "../../../views/partials/partials.module";
// Translation
import { TranslateModule } from "@ngx-translate/core";
import { GraphDateFilterModule } from "../graph-date-filter/graph-date-filter.module";

@NgModule({
	declarations: [OrderQuantityComponent],
	exports: [OrderQuantityComponent],
	imports: [
		FormsModule,
		CommonModule,
		PartialsModule,
		TranslateModule,
		GraphDateFilterModule
	]
})
export class OrderQuantityModule {}
