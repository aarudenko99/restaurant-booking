import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationItemComponent } from "./notification-item.component";
import { InlineSVGModule } from "ng-inline-svg";
import { MatDividerModule } from "@angular/material";

@NgModule({
	declarations: [NotificationItemComponent],
	exports: [NotificationItemComponent],
	imports: [CommonModule, MatDividerModule, InlineSVGModule]
})
export class NotificationItemModule {}
