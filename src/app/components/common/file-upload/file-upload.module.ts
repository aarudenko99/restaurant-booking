import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatButtonModule, MatListModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { PartialsModule } from '../../../views/partials/partials.module';

@NgModule({
    declarations: [FileUploadComponent],
    imports: [
        CommonModule,
        NgxUploaderModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        PartialsModule
    ],
    exports : [
        FileUploadComponent,
        NgxUploaderModule
    ]
})
export class FileUploadModule { }
