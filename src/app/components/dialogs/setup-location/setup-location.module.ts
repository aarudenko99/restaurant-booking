// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pages
import { SetupLocationComponent } from './setup-location.component';
// Imports
import { GoogleMapModule } from '../../common/google-map/google-map.module';
import { PartialsModule } from '../../../views/partials/partials.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [SetupLocationComponent],
    entryComponents: [SetupLocationComponent],
    exports: [],
    imports: [
        CommonModule,
        PartialsModule,
        GoogleMapModule,
        MatButtonModule
    ],
})
export class SetupLocationDialogModule {}
