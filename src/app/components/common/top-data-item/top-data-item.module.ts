import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopDataItemComponent } from './top-data-item.component';
import { TopDataCardModule } from './top-data-card/top-data-card.module';

@NgModule({
  declarations: [TopDataItemComponent],
  entryComponents: [TopDataItemComponent],
  imports: [
    CommonModule,
    TopDataCardModule
  ],
  exports: [TopDataItemComponent]
})
export class TopDataItemModule { }
