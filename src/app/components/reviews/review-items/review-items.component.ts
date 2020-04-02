import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { RestaurantReview } from "../../../common/models/restaurant-reviews";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs";
import { AuthService } from "../../../core/auth";
import { ReviewService } from "../../../services/review.service";

@Component({
	selector: "mm-review-items",
	templateUrl: "./review-items.component.html",
	styleUrls: ["./review-items.component.scss"]
})
export class ReviewItemsComponent {
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	selectedRestaurantId: string;
	reviews: Observable<Array<RestaurantReview>>;
	isEmpty: boolean;
	// reviews: Array<RestaurantReview> = [];
	dataSource: MatTableDataSource<RestaurantReview>;
	allReviews: Array<RestaurantReview> = [];
	rating: number;
	menuItems = [
		{
			icon: "flaticon-star",
			value: 5,
			text: "Stars"
		},
		{
			icon: "flaticon-star",
			value: 4,
			text: "Stars"
		},
		{
			icon: "flaticon-star",
			value: 3,
			text: "Stars"
		},
		{
			icon: "flaticon-star",
			value: 2,
			text: "Stars"
		},
		{
			icon: "flaticon-star",
			value: 1,
			text: "Star"
		}
	];

	constructor(
		private cd: ChangeDetectorRef,
		private auth: AuthService,
		private reviewService: ReviewService
	) {
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.selectedRestaurantId = id;
				this.loadRestauranReviews(5);
			}
		});
	}

	ngOnDestroy() {
		if (this.dataSource) {
			this.dataSource.disconnect();
		}
	}

	loadRestauranReviews(stars: number) {
		// this.reviews = [];
		this.rating = stars;
		// Helpers.setLoading(true);
		this.reviewService
			.getReviewsByRestaurant(this.selectedRestaurantId, stars)
			.subscribe(
				data => {
					// this.reviews = data.data;
					this.dataSource = new MatTableDataSource(data.data);
					this.dataSource.paginator = this.paginator;
					this.reviews = this.dataSource.connect();
					this.reviews.subscribe(reviews =>
						!reviews.length
							? (this.isEmpty = true)
							: (this.isEmpty = false)
					);
					this.cd.detectChanges();
					// console.log(this.reviews);
					// Helpers.setLoading(false);
				},
				error => {
					// Helpers.setLoading(false);
				}
			);
	}

	// showAllReview() {
	//     this.allReviews = [];
	//     const stars = -1;

	//     if (localStorage.getItem('SelectedRestaurant') !== 'undefined') {
	//         this.SelectedRestaurant = JSON.parse(localStorage.getItem('SelectedRestaurant'));
	//     }
	//     if (this.SelectedRestaurant != null) {
	//         // Helpers.setLoading(true);
	//         this.reviewService.getReviewsByRestaurant('5b473cc0f199aa0970a5d7e6', stars).subscribe(
	//             (data) => {
	//                 this.allReviews = data.data;
	//                 console.log(this.allReviews);
	//                 // Helpers.setLoading(false);
	//             }, (error) => {
	//                 // Helpers.setLoading(false);
	//             });
	//     }
	// }
}
