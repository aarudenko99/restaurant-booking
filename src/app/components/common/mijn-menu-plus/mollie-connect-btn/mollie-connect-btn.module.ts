import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MollieConnectBtnComponent } from './mollie-connect-btn.component';

@NgModule({
    declarations: [ MollieConnectBtnComponent ],
    exports: [ MollieConnectBtnComponent ],
    imports: [
        CommonModule,
    ]
})
export class MollieConnectButtonModule { }
