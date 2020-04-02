import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantTagsComponent } from './restaurant-tags.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [ RestaurantTagsComponent ],
    exports: [ RestaurantTagsComponent ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        // Material
        MatChipsModule,
        MatIconModule,

        // ngBootstrap
        NgbTooltipModule
    ]
})
export class RestaurantTagsModule { }
