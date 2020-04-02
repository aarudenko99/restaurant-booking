export class RestaurantTips {
    _id: String;
    TipAmount: Number;
    GivenByUserId: Number;
    OrderId: Number;
    RestaurantId: Number;
    TableId: { type: String};
    RecievedByStaffId: Number;
    Month: Number;
    CreatedDate: Date;
    ModifiedDate: Date;
}
