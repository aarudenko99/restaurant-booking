export class RestaurantReview {
    _id: String;
    RestaurantId: Number;
    UserId: Number;
    Stars: Number;
    Review: String;
    CreatedDate: Date;
    ModifiedDate: Date;
    userdetails: Array<any>;
}
