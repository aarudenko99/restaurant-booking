import { Orders } from "./order";

export class TableOrder {
	_id: string;
	ReservationCode: string;
	OrderStatus: string;
	PaymentStatus: string;
	TableName: string;
	Timestamp: number;
	OrderdItems: Orders;
	newOrder: object;
}
