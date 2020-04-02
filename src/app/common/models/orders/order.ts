import { MenuItem } from "../menu/menu-item";
import { User } from "../../../core/auth/_models/user.model";

export class Orders {
	User: User;
	ReservationCode: string;
	FoodItems: Array<MenuItem>;
	Drinks: Array<MenuItem>;
}
