import { Component, ViewChild, Injector } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { TopMenuItemController } from "../../../controllers/menu/top-menu-item.controller";
import { TopMenuItems } from "../../../common/models/top-menu-items";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "mm-top-menu-items",
	templateUrl: "./top-menu-items.component.html",
	styleUrls: ["./top-menu-items.component.scss"]
})
export class TopMenuItemsComponent extends TopMenuItemController {
	selectedRestaurantId: string;
	displayedColumns = ["name", "price", "Quantity"];
	dataSource: MatTableDataSource<TopMenuItems>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	auth: AuthService;

	constructor(injector: Injector) {
		super(injector);
		this.auth = this.injector.get(AuthService);
		this.auth.selectedRestaurantId.subscribe(restaurantId => {
			const id = restaurantId
				? restaurantId
				: this.auth.getRestaurantId();
			if (id) {
				this.loadData(id);
			}
		});
	}

	loadData(id: string) {
		this.getTopMenuItems(id).then(topMenuItems => {
			this.dataSource = new MatTableDataSource(topMenuItems);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
}
