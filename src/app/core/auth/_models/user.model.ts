import { BaseModel } from "../../_base/crud";
import { Address } from "./address.model";

export class User extends BaseModel {
	_id: string;
	id: number;
	Password: string;
	EmailAddress: string;
	token: string;
	Roles: number[];
	Role: string;
	RoleId: string;
	PictureUrl: string;
	FirstName: string;
	LastName: string;
	FullName: string;
	Occupation: string;
	CompanyName: string;
	PhoneNumber: string;
	Address: Address;
	RestaurantId: string;
	RestaurantName: string;
	EmailVerified: boolean;
	isStaff: boolean;
	hasFormError: boolean;
	avgAccepted: boolean;

	clear(): void {
		this.id = undefined;
		this.EmailAddress = "";
		this.Roles = [];
		this.FullName = "";
		this.PictureUrl = "";
		this.Occupation = "";
		this.CompanyName = "";
		this.PhoneNumber = "";
		this.Address = new Address();
		this.Address.clear();
	}
}
