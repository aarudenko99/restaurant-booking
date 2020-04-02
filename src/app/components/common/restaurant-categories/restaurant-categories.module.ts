import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Select2Module } from "ng2-select2";
import { PartialsModule } from "../../../views/partials/partials.module";
import { RestaurantCategoriesComponent } from "./restaurant-categories.component";
import { AddRestaurantCategoryDialogModule } from "../../dialogs/add-restaurant-category/add-restaurant-category.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
	declarations: [RestaurantCategoriesComponent],
	exports: [RestaurantCategoriesComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		Select2Module,
		ReactiveFormsModule,
		PerfectScrollbarModule,
		AddRestaurantCategoryDialogModule
	]
})
export class RestaurantCategoriesModule {}
