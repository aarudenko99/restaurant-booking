// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Pages
import { ActiveBillsComponent } from "./active-bills.component";

// Modules
import { PartialsModule } from "../../partials/partials.module";
import { TopDataItemModule } from "../../../components/common/top-data-item/top-data-item.module";
import { BillComponentModule } from "../../../components/bill/bill.component.module";

@NgModule({
	declarations: [ActiveBillsComponent],
	exports: [ActiveBillsComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		TopDataItemModule,
		BillComponentModule
	],
	providers: []
})
export class ActiveBillsModule {}
