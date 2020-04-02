import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRestaurantPageComponent } from './create-restaurant.component';

// Modules
import { PartialsModule } from '../../partials/partials.module';
import { WizzardComponentsModule } from '../../../components/wizzard/wizzard.module';

@NgModule({
  declarations: [CreateRestaurantPageComponent],
  exports: [CreateRestaurantPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    WizzardComponentsModule
  ]
})
export class CreateRestaurantModule { }
