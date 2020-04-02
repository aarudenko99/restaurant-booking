import { RestaurantFeatures } from "./restaurant-features";
import { TimeSlots } from "./restaurant/timeslots";
import { RestaurantTags } from "./restaurant-tags";

export class Restaurant {
	_id: string;
	place_id: string;
	open_now: boolean;
	Name: string;
	UserId: string;
	Address: string;
	City: string;
	Description: string;
	Images: Array<any>;
	Lat: number;
	Long: number;
	Rating: number;
	State: string;
	Country: string;
	ThumbNail: string;
	Zip: string;
	Email: string;
	PhoneNumber: string;
	RestaurantCategoryId: string;
	RestaurantCategoryName: string;
	CreatedDate: Date;
	ModifiedDate: Date;
	TotalSeats: number;
	OpeningHours: Array<any>;
	TimeSlots: Array<TimeSlots>;
	DietaryTypes: Array<string>;
	ImageUrls: Array<any>;
	Tags: Array<RestaurantTags>;
    RestaurantFeatures: Array<RestaurantFeatures>;
    MijnMenuPlus: boolean;
    MenuSetup: boolean;
    FloorPlanSetup: boolean;
}
