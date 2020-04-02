// Angular
import { NgModule } from '@angular/core';
// Pages
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffersDialogComponent } from './offers-dialog.component';
import { MaterialImportModule } from '../../common/angular-material/material.module';
import { OffersModule } from '../../offers/offer.module';

@NgModule({
    declarations: [OffersDialogComponent],
    entryComponents: [OffersDialogComponent],
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        MaterialImportModule,
        OffersModule
    ],
    providers: []
})
export class OffersDialogModule {}
