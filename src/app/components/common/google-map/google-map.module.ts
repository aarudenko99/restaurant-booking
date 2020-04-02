import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [GoogleMapComponent],
  exports: [GoogleMapComponent],
  imports: [
    CommonModule,
    GooglePlaceModule
  ],
})
export class GoogleMapModule { }
