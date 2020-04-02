// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { Select2Module } from "ng2-select2";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

// Pages
import { MenuItemDialogComponent } from "./menu-item-dialog";
import { ImageGalleryComponentsModule } from "../../common/img-gallery/img-gallery.module";
import { MaterialImportModule } from "../../common/angular-material/material.module";
// import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AngularMultiSelectModule } from "../../common/multiselect-dropdown/multiselect-dropdown.component";

@NgModule({
	declarations: [MenuItemDialogComponent],
	entryComponents: [MenuItemDialogComponent],
	exports: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialImportModule,
		NgbTooltipModule,
		PerfectScrollbarModule,
		ImageGalleryComponentsModule,
		Select2Module,
		// AngularMultiSelectModule,
		AngularMultiSelectModule,
		FormsModule
	],
	providers: []
})
export class MenuItemDialogModule {}
