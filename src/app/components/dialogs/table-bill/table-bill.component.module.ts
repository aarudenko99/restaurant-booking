// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Pages
import { TableBillComponent } from "./table-bill.component";
// Imports
import { MatButtonModule } from "@angular/material";
import { BillComponentModule } from "../../bill/bill.component.module";

@NgModule({
	declarations: [TableBillComponent],
	entryComponents: [TableBillComponent],
	exports: [],
	imports: [CommonModule, MatButtonModule, BillComponentModule]
})
export class TableBillDialogModule {}
