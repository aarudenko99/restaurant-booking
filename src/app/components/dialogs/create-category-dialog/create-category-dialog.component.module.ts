// Angular
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgbTooltipModule, NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { PartialsModule } from "../../../views/partials/partials.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";

// Pages
import { CreateCategoryDialogComponent } from "./create-category-dialog.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";

@NgModule({
	declarations: [CreateCategoryDialogComponent, EditCategoryComponent],
	entryComponents: [CreateCategoryDialogComponent, EditCategoryComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		MaterialImportModule,
		NgbTooltipModule,
		NgbTabsetModule,
		PartialsModule
	],
	providers: []
})
export class CreateCategoryDialogModule {}
