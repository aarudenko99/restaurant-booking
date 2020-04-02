import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CreateMenuComponent } from "./create-menu/create-menu.component";
import { PartialsModule } from "../../views/partials/partials.module";
import {
	NgbModalModule,
	NgbPopoverModule,
	NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import { TopMenuItemsComponent } from "./top-menu-items/top-menu-items.component";
import { MenuItemTableComponent } from "./menu-item-table/menu-item-table.component";
import { EmptyTableComponentsModule } from "../common/empty-table/empty-table.module";
import { MaterialImportModule } from "../common/angular-material/material.module";
import { DialogsModule } from "../dialogs/dialogs.module";
import { MenuPerformanceComponent } from "./menu-performance/menu-performance.component";
import { InlineSVGModule } from "ng-inline-svg";
import { GraphDateFilterModule } from "../common/graph-date-filter/graph-date-filter.module";

@NgModule({
	declarations: [
		CreateMenuComponent,
		TopMenuItemsComponent,
		MenuItemTableComponent,
		MenuPerformanceComponent
	],
	exports: [
		CreateMenuComponent,
		TopMenuItemsComponent,
		MenuPerformanceComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		PartialsModule,
		EmptyTableComponentsModule,
		GraphDateFilterModule,

		// ng-mat module
		MaterialImportModule, // TO DO Define only necessary imports

		// ng-bootstrap modules
		NgbModalModule,
		DialogsModule,
		NgbPopoverModule,
		NgbTooltipModule,
		InlineSVGModule
	]
})
export class MenuComponentModule {}
