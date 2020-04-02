import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CreateCategoryDialogModule } from "./create-category-dialog/create-category-dialog.component.module";
import { MenuItemDialogModule } from "./menu-item-dialog/menu-item-dialog.module";
import { CreateTableDialogModule } from "./create-table-dialog/create-table-dialog.module";

@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		CreateCategoryDialogModule,
		MenuItemDialogModule,
		CreateTableDialogModule
	]
})
export class DialogsModule {}
