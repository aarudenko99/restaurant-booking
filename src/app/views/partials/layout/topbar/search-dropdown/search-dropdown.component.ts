// Angular
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
	Output,
	EventEmitter
} from "@angular/core";
import { LiveOrderService } from "../../../../../services/live-order.service";
import { LiveOrdersComponent } from "../../../../../views/pages/live-orders/live-orders.component";
import { Orders } from "../../../../../common/models/orders/order";
import { BillService } from "../../../../../services/bill.service";

@Component({
	selector: "kt-search-dropdown",
	templateUrl: "./search-dropdown.component.html"
})
export class SearchDropdownComponent implements OnInit {
	// Public properties

	// Set icon class name
	@Input() icon: string = "flaticon2-search-1";

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	@Input() type: "brand" | "success" | "warning" = "success";

	@Input() pageType: string;

	@Output() filterItems = new EventEmitter<Array<Orders>>();

	@ViewChild("searchInput", { static: true }) searchInput: ElementRef;
	private orderComponent: LiveOrdersComponent;

	data: any[];
	result: any[];
	loading: boolean;

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	constructor(
		private cdr: ChangeDetectorRef,
		private liveOrderService: LiveOrderService,
		private billService: BillService
	) {}

	/**
	 * On init
	 */
	ngOnInit(): void {
		// simulate result from API
		// type 0|1 as separator or item
		this.result = [
			{
				icon: "",
				text: "Documents",
				type: 0
			},
			{
				icon: '<i class="flaticon-interface-3 kt-font-warning">',
				text: "Annual finance report",
				type: 1
			},
			{
				icon: '<i class="flaticon-share kt-font-success"></i>',
				text: "Company meeting schedule",
				type: 1
			},
			{
				icon: '<i class="flaticon-paper-plane kt-font-info"></i>',
				text: "Project quotations",
				type: 1
			},
			{
				icon: "",
				text: "Customers",
				type: 0
			},
			{
				icon: '<img src="assets/media/users/user1.jpg" alt="">',
				text: "Amanda Anderson",
				type: 1
			},
			{
				icon: '<img src="assets/media/users/user2.jpg" alt="">',
				text: "Kennedy Lloyd",
				type: 1
			},
			{
				icon: '<img src="assets/media/users/user3.jpg" alt="">',
				text: "Megan Weldon",
				type: 1
			},
			{
				icon: '<img src="assets/media/users/user4.jpg" alt="">',
				text: "Marc-André ter Stegen",
				type: 1
			},
			{
				icon: "",
				text: "Files",
				type: 0
			},
			{
				icon: '<i class="flaticon-lifebuoy kt-font-warning"></i>',
				text: "Revenue report",
				type: 1
			},
			{
				icon: '<i class="flaticon-coins kt-font-primary"></i>',
				text: "Anual finance report",
				type: 1
			},
			{
				icon: '<i class="flaticon-calendar kt-font-danger"></i>',
				text: "Tax calculations",
				type: 1
			}
		];

		if (this.pageType === "orders") {
			this.liveOrderService.getAllOrders().subscribe(allOrders => {
				this.data = allOrders["data"];
			});
		} else if (this.pageType === "bills") {
			this.billService.getAllBills().subscribe(allBills => {
				console.log("ALL BILLS!", allBills);
				this.data = allBills["AllBills"];
			});
		}
	}

	/**
	 * Search
	 * @param e: Event
	 */
	search(e) {
		this.loading = true;

		if (this.pageType !== "orders" && this.pageType !== "bills") {
			// simulate getting search result
			setTimeout(() => {
				this.data = this.result;
				this.loading = false;
				this.cdr.markForCheck();
			}, 500);
		} else {
			const filteredItems = this.data.filter(order => {
				return order.ReservationCode.startsWith(
					e.target.value.toUpperCase()
				);
			});

			this.loading = false;
			console.log(filteredItems);
			this.filterItems.emit(filteredItems);
		}
	}

	/**
	 * Clear search
	 *
	 * @param e: Event
	 */
	clear(e) {
		this.data = null;
		this.searchInput.nativeElement.value = "";
	}

	openChange() {
		setTimeout(() => this.searchInput.nativeElement.focus());
	}
}
