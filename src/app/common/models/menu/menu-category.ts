import { MenuItem } from './menu-item';

export class MenuCategory {
	_id: string;
	index: number;
	RestaurantId: string;
	CategoryName: string;
	Type: string;
	SubCategories: Array<any>;
	MenuItems: Array<MenuItem>;
	edit: boolean;
	deleted: boolean;
}
