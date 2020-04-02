import { MenuExtraOptions } from "./menu-extra-options";

export class MenuItem {
	_id: string;
	_index: number;
	Name: string;
	MenuRestrictionType: Array<string>;
	AllergicTypes: Array<string>;
	MenuType: string;
	ImageUrl: string;
	MenuCategoryId: string;
	SubCategory: any;
	Ingredients: string;
	SideMenu: string;
	RestaurantId: string;
	CreatedDate: Date;
	ModifiedDate: Date;
	Description: string;
	Price: number;
	PriceExcelTax: number;
	TaxLevel: string;
	Quantity: number;
	DietaryType: Array<string>;
	OrderComment: string;
	ExtraOptions: Array<MenuExtraOptions>;
}
