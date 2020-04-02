import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from 'ngx-gallery';
import { ImageGalleryComponentComponent } from './img-gallery.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
    declarations: [ ImageGalleryComponentComponent ],
    exports: [ ImageGalleryComponentComponent ],
    imports: [
        CommonModule,
        NgxGalleryModule,
        ImageCropperModule
    ]
})
export class ImageGalleryComponentsModule { }
