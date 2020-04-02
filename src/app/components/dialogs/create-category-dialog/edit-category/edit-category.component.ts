import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	Injector
} from "@angular/core";
import { MenuCategory } from "../../../../common/models/menu/menu-category";
import { MenuController } from "../../../../controllers/menu/menu.controller";

@Component({
	selector: "mm-edit-category",
	templateUrl: "./edit-category.component.html",
	styleUrls: ["./edit-category.component.scss"]
})
export class EditCategoryComponent extends MenuController implements OnInit {
	@Input() selectedIndex: number;
	@Input() category: MenuCategory;
	@Input() categories: Array<MenuCategory>;
	@Output() addSubCat = new EventEmitter<any>();

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {
		console.log(this.category);
	}

	addSubCategory() {
		this.category.SubCategories.push({
			SubCategoryName: ""
		});
		// this.addSubCat.emit();
	}
}
