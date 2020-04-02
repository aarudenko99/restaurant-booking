import { UserOrders } from "./user-orders";
import { PaymentDetails } from "./payment-details";

export class Bill {
	TableId: string;
	TableName: string;
	ReservationCode: string;
	TotalBill: number;
	BillStatus: string;
	OrderTime: string;
	OrderStatus: string;
	Orders: Array<UserOrders>;
	PaymentDetails: Array<PaymentDetails>;
}
