import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [PrintComponent],
	exports: [PrintComponent],
	imports: [FormsModule, CommonModule]
})
export class PrintModule {}
