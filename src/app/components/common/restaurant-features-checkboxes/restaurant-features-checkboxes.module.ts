import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantFeaturesCheckboxesComponent } from './restaurant-features-checkboxes.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
	declarations: [RestaurantFeaturesCheckboxesComponent],
	exports: [RestaurantFeaturesCheckboxesComponent],
	imports: [CommonModule, RouterModule, FormsModule, MatCheckboxModule]
})
export class RestaurantFeaturesCheckboxesModule {}
