import { Table } from "./table";

export class FloorPlan {
	_id?: string;
	RestaurantId: string;
	Name: string;
	ZoomLevel: number;
	DisabledReservation: boolean;
	Tables: Array<Table>;
}
// constructor(
//     public _id: string,
//     public RestaurantId: string,
//     public Name: object,
//     public Tables: Table
// ) {
// }

// static fromObject(data: any): FloorPlan {
//     return new FloorPlan(data.name, data.alpha2Code, data.callingCodes, data.flag);
// }
