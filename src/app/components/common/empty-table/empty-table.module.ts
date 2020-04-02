import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmptyTableComponent } from "./empty-table.component";
import { MatTableModule, MatTooltipModule } from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";

@NgModule({
	declarations: [EmptyTableComponent],
	exports: [EmptyTableComponent],
	imports: [CommonModule, CdkTableModule, MatTableModule, MatTooltipModule]
})
export class EmptyTableComponentsModule {}
