import {
	Component,
	OnInit,
	ViewChild,
	Input,
	Injector,
	ChangeDetectorRef
} from "@angular/core";
import {
	MatPaginator,
	MatSort,
	MatTableDataSource,
	MatDialog
} from "@angular/material";
import { ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { SelectionModel } from "@angular/cdk/collections";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import { MenuController } from "../../../controllers/menu/menu.controller";
import { DeleteEntityDialogComponent } from "../../../views/partials/content/crud";
import { MenuItemDialogComponent } from "../../dialogs/menu-item-dialog/menu-item-dialog";
import { TranslateService } from "@ngx-translate/core";
import clonedeep from "lodash.clonedeep";
import { LayoutUtilsService, MessageType } from "../../../core/_base/crud";
import { MenuItem } from "../../../common/models/menu/menu-item";
import { MenuCategory } from "../../../common/models/menu/menu-category";

@Component({
	selector: "mm-menu-item-table",
	templateUrl: "./menu-item-table.component.html",
	styleUrls: ["./menu-item-table.component.scss"]
})
export class MenuItemTableComponent extends MenuController implements OnInit {
	@Input() menu: Array<MenuCategory>;
	@Input() loading: boolean;
	@Input() tab: MenuCategory;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// 'select',
	displayedColumns: Array<any> = [
		"_index",
		"Name",
		"MenuRestrictionType",
		"SubCategory",
		"Price",
		"ExtraOptions",
		"actions"
	];
	dataSource = new MatTableDataSource<MenuCategory>();
	modalReference: NgbModalRef;
	selection = new SelectionModel<any>(true, []);
	filterStatus: string = "";
	edit: boolean;

	constructor(injector: Injector, public dialog: MatDialog) {
		super(injector);
	}

	private modalDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return "by pressing ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return "by clicking on a backdrop";
		} else {
			return `with: ${reason}`;
		}
	}

	ngOnInit() {
		this.dataSource = new MatTableDataSource(this.menu);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		console.log(this.menu);
		this.dataSource.filterPredicate = (data, filter: string) => {
			const accumulator = (currentTerm, key) => {
				return this.nestedFilterCheck(currentTerm, data, key);
			};
			const dataStr = Object.keys(data)
				.reduce(accumulator, "")
				.toLowerCase();
			const transformedFilter = filter.trim().toLowerCase();
			return dataStr.indexOf(transformedFilter) !== -1;
		};
	}

	openAddMenuItemDialog(
		modalType: string,
		category?: MenuCategory,
		data?: any
	) {
		console.log(category, data);
		const dialogRef = this.dialog.open(MenuItemDialogComponent, {
			width: "50%",
			data: {
				type: modalType,
				category,
				editMenuItem: data
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log("The dialog was closed", result);

				if (modalType === "add") {
					this.dataSource.data = clonedeep([
						...this.dataSource.data,
						...result
					]);
				} else if (modalType === "edit") {
					const index = this.dataSource.data.findIndex(
						category => category["_id"] === result._id
					);
					this.dataSource.data[index] = result;
					this.dataSource.data = clonedeep(this.dataSource.data);
				}
			}
		});
	}

	update() {
		this.edit = false;
	}

	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // reservations defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	nestedFilterCheck(search, data, key) {
		if (typeof data[key] === "object") {
			for (const k in data[key]) {
				if (data[key][k] !== null) {
					search = this.nestedFilterCheck(search, data[key], k);
				}
			}
		} else {
			search += data[key];
		}
		return search;
	}

	onListDrop(event: CdkDragDrop<string[]>) {
		// Swap the elements around
		moveItemInArray(
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
		this.dataSource.data = clonedeep(this.dataSource.data);
	}

	reorderItems(menuItemId: string) {
		this.edit = true;
	}

	editItem(menuItem: MenuItem) {
		this.openAddMenuItemDialog("edit", this.tab, menuItem);
	}

	delete(menuItem: any) {
		const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
			panelClass: "kt-portlet-dialog",
			data: {
				title: `Delete ${menuItem.Name} ?`,
				description: `Are you sure you want to delete ${menuItem.Name} item out of the menu?`
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log("The dialog was closed", result, menuItem);
				this.menuService.deleteMenuItem(menuItem._id).subscribe(
					data => {
						// Helpers.setLoading(false);
						// Update table dataSource
						this.dataSource.data = this.dataSource.data.filter(
							dataSrc => dataSrc["_id"] !== data.data.DeletedId
						);
						// const deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.MESSAGE');
						const deleteMessage = `You have deleted ${menuItem.Name}`;
						this.layoutUtilsService.showActionNotification(
							deleteMessage,
							MessageType.Delete
						);
						this.cd.detectChanges();
						// this.modalReference.close();
					},
					error => {
						// Helpers.setLoading(false);
						this.modalDismissReason(ModalDismissReasons.ESC);
					}
				);
			}
		});
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.menu.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.menu.length) {
			this.selection.clear();
		} else {
			this.menu.forEach(row => this.selection.select(row));
		}
	}
}
