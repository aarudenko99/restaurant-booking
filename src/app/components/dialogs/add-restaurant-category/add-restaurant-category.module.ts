import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
import { AddRestaurantCategoryComponent } from "./add-restaurant-category.component";

@NgModule({
	declarations: [AddRestaurantCategoryComponent],
	exports: [AddRestaurantCategoryComponent],
	entryComponents: [AddRestaurantCategoryComponent],
	imports: [CommonModule, FormsModule, PartialsModule, MaterialImportModule]
})
export class AddRestaurantCategoryDialogModule {}
