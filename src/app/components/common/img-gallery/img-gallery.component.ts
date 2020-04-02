import { WizardService } from "./../../../services/wizard.service";
import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	ChangeDetectorRef
} from "@angular/core";
import {
	NgxGalleryOptions,
	NgxGalleryAnimation,
	NgxGalleryImage
} from "ngx-gallery";
import { RestaurantService } from "../../../services/restaurant.service";

@Component({
	selector: "mm-image-gallery",
	templateUrl: "./img-gallery.component.html",
	styleUrls: ["./img-gallery.component.scss"]
})
export class ImageGalleryComponentComponent implements OnInit {
	@Input() title: string;
	@Input() multiple = true;
	@Input() height = "200px";
	galleryOptions: NgxGalleryOptions[];
	uploadedImages: NgxGalleryImage[] = [];
	public imagePath;
	urls: NgxGalleryImage[] = new Array<NgxGalleryImage>();
	public message: string;
	fileToUpload: FileList = null;
	frmData: FormData;

	hasFile = false;
	imageChangedEvent: any = "";
	croppedImage: any = "";
	fileFormat: any = "png";
	selectedFileName: string = null;

	constructor(
		private restaurantService: RestaurantService,
		private wizardService: WizardService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.galleryOptions = [
			{
				image: false,
				thumbnailsRemainingCount: true,
				width: "100%",
				height: this.height,
				thumbnailsColumns: 4,
				previewCloseOnClick: true,
				previewCloseOnEsc: true,
				imageAnimation: NgxGalleryAnimation.Slide,
				thumbnailActions: [
					{
						icon: "fa fa-trash-alt",
						onClick: this.deleteImage.bind(this),
						titleText: "delete"
					}
				],
				actions: [
					{
						icon: "fa fa-trash-alt",
						onClick: this.deleteImage.bind(this),
						titleText: "delete"
					}
				]
			}
		];
		if (
			this.wizardService.formData.Images &&
			this.wizardService.formData.Images.length
		) {
			this.wizardService.formData.Images.map(image => {
				this.urls.push({
					small: image["Path"],
					medium: image["Path"],
					big: image["Path"]
				});
			});
		}
	}

	deleteImage(event, index): void {
		this.urls.splice(index, 1);
	}

	preview(files) {
		this.urls = [];

		if (files) {
			for (const file of files) {
				const mimeType = file.type;
				if (mimeType.match(/image\/*/) == null) {
					this.message = "Only images are supported.";
					return;
				}
				const reader = new FileReader();
				reader.onload = (e: any) => {
					this.urls.push({
						small: e.target.result,
						medium: e.target.result,
						big: e.target.result
					});
					this.cd.detectChanges();
				};
				reader.readAsDataURL(file);
			}
			this.handleFileInput(files);
		}
	}

	handleFileInput(files) {
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append("Images", files[i]);
		}
		this.restaurantService.uploadImages(formData).subscribe(item => {
			console.log(item.data);
			this.wizardService.formData.Images = item.data;
		});
	}

	handleFileInputForSingleFile(file) {
		const requestBody = {
			PictureUrl: file,
			FileName: this.selectedFileName
		};
		this.restaurantService
			.uploadBase64Image(requestBody)
			.subscribe(data => {
				this.uploadedImages.push(data.data);
				this.wizardService.formData.Images = this.uploadedImages;
				console.log(this.wizardService.formData.Images);
			});
	}

	saveFile(files: FormData, id: any) {
		this.restaurantService.postFile(files, id).subscribe(
			data => {
				this.fileToUpload = null;
			},
			error => {
				this.fileToUpload = null;
			}
		);
	}

	fileChangeEvent(event: any, file): void {
		this.fileFormat = file[0].name.split(".")[1];
		this.hasFile = true;
		this.selectedFileName = file[0].name;
		this.imageChangedEvent = event;
	}

	imageCropped(event) {
		console.log(event);
		this.croppedImage = event.base64;
	}

	finishCrop() {
		this.hasFile = false;
		this.urls.push({
			small: this.croppedImage,
			medium: this.croppedImage,
			big: this.croppedImage
		});
		this.handleFileInputForSingleFile(this.croppedImage);
	}
}
