import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NotificationItemComponent } from "./notification-item/notification-item.component";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { MultiselectDropdownComponent } from "./multiselect-dropdown/multiselect-dropdown.component";
import { QrCodeComponent } from './qr-code/qr-code.component';
// import { MollieSubscriptionComponent } from "./mijn-menu-plus/mollie-subscription/mollie-subscription.component";
// import { IconBoxWaveComponent } from "./icon-box-wave/icon-box-wave.component";
// import { PrintComponent } from "./print/print.component";
// import { OrderQuantityComponent } from "./order-quantity/order-quantity.component";

@NgModule({
	declarations: [
		// IconBoxWaveComponent,
		// PrintComponent,
		// OrderQuantityComponent
		// MollieSubscriptionComponent
		NotificationItemComponent,
		ErrorDialogComponent,
		MultiselectDropdownComponent,
		QrCodeComponent
	],
	exports: [],
	imports: [CommonModule, RouterModule, FormsModule]
})
export class CommonComponentsModule {}
