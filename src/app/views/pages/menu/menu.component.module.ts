// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Pages
import { MenuPageComponent } from "./menu.component";

// Components
import { PartialsModule } from "../../partials/partials.module";
import { CreateCategoryDialogModule } from "../../../components/dialogs/create-category-dialog/create-category-dialog.component.module";
import { MenuComponentModule } from "../../../components/menu/menu.component.module";
import { ReviewsModule } from "../../../components/reviews/review.module";
import { DiscountBarModule } from "../../../components/discount-bar/discount-bar.module";

@NgModule({
	declarations: [MenuPageComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		MenuComponentModule,
		ReviewsModule,
		DiscountBarModule,
		CreateCategoryDialogModule
	],
	providers: []
})
export class MenuModule {}
