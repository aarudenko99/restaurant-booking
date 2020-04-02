import { Component, Inject, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	FormControl,
	FormControlName
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MenuService } from "../../../services/menu.service";
import { MenuItem } from "../../../common/models/menu/menu-item";
import { AuthService } from "../../../core/auth";

@Component({
	selector: "mm-menu-item-dialog",
	templateUrl: "./menu-item-dialog.html",
	styleUrls: ["./menu-item-dialog.scss"]
})
export class MenuItemDialogComponent implements OnInit {
	MenuType: string;
	menuItemForm: FormGroup;
	submitted = false;

	DietaryType: Array<any> = [];
	subCategories: Array<any> = [];
	AllergicTypes: Array<any> = [];
	menuItem: MenuItem = new MenuItem();
	selectedSubcategory: Array<any> = [];
	extraOptions = [{ name: "", price: null }];
	MenuRestrictionType: Array<any> = [
		{ name: "Breakfast" },
		{ name: "Lunch" },
		{ name: "Dinner" }
	];

	public sideDishes: Array<any> = [];
	selectedSideDishes: Array<any> = [];
	dropdownSettings = {};

	constructor(
		public dialogRef: MatDialogRef<MenuItemDialogComponent>,
		private menuService: MenuService,
		private fb: FormBuilder,
		private auth: AuthService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		/* Initiate the form structure */
		const menuRestrictionFormControls = this.MenuRestrictionType.map(
			() => new FormControl(false)
		);
		// Create a FormControl for the select/unselect all checkbox
		const selectAllControl = new FormControl(false);

		this.menuItemForm = this.fb.group({
			Name: ["", Validators.required],
			Ingredients: ["", Validators.required],
			SideMenu: [[]],
			Price: ["", Validators.required],
			Description: ["", Validators.required],
			MenuRestrictionType: new FormArray(menuRestrictionFormControls),
			DietaryType: new FormArray([]),
			AllergicTypes: new FormArray([]),
			selectAll: selectAllControl
		});

		this.onChanges();
		this.getAllergicTypes();
		this.getAllDietaryTypes();
		this.getMenuSideDishes();

		if (data) {
			this.MenuType =
				data.category.Type === "Food" ? "FoodItem" : "Drinks";
			if (data.type === "edit") {
				if (data.editMenuItem) {
					this.menuItem = data.editMenuItem;

					if (data.category.SubCategories) {
						this.subCategories = data.category.SubCategories;

						if (this.menuItem.SubCategory) {
							const index = this.subCategories.findIndex(
								subCategories =>
									this.menuItem.SubCategory.id ===
									subCategories._id
							);
							this.selectedSubcategory = this.subCategories[
								index
							];
						} else {
							this.menuItem.SubCategory = {};
						}
					}
				}

				this.extraOptions =
					data.editMenuItem.ExtraOptions &&
					data.editMenuItem.ExtraOptions.length > 1
						? data.editMenuItem.ExtraOptions
						: this.extraOptions;
				if (this.menuItemForm) {
					console.log(this.menuItemForm, data);
					this.menuItemForm.patchValue({
						Name: data.editMenuItem.Name,
						Ingredients: data.editMenuItem.Ingredients,
						SideMenu: data.editMenuItem.SideMenu,
						Price: data.editMenuItem.Price,
						Description: data.editMenuItem.Description,
						MenuRestrictionType:
							data.editMenuItem.MenuRestrictionType
						// DietaryType: data.editMenuItem.DietaryType
						// AllergicTypes: data.editMenuItem.DietaryTypes
					});

					console.log(this.menuItemForm);

					// this.menuItemForm.setControl(
					// 	"AllergicTypes",
					// 	this.fb.array(data.editMenuItem.AllergicTypes || [])
					// );
					console.log(this.menuItemForm);
					this.menuItemForm.setControl(
						"DietaryType",
						this.fb.array(data.editMenuItem.DietaryType || [])
					);

					console.log(data);

					this.setDiateryItemSelectedItems();
					this.setAllergicItemSelectedItems();
				}
			}
		}
	}

	ngOnInit() {
		this.dropdownSettings = {
			singleSelection: false,
			text: "Select Side Dishes",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			enableSearchFilter: true
		};
	}

	diateryObjectArray: any = [];
	allergicTypesObjectArray: any = [];

	setDiateryItemSelectedItems() {
		this.menuService.getAllDietaryType().subscribe(dietaryType => {
			this.diateryObjectArray = [];
			dietaryType.data.forEach(dt => {
				this.diateryObjectArray.push(
					this.data.editMenuItem.DietaryType.findIndex(
						editedDT => editedDT === dt._id
					) != -1
						? dt.Name
						: null
				);
			});
		});
	}

	setAllergicItemSelectedItems() {
		this.menuService.getAllergicType().subscribe(allergicType => {
			this.allergicTypesObjectArray = [];
			allergicType.data.forEach(at => {
				this.allergicTypesObjectArray.push(
					this.data.editMenuItem.AllergicTypes.findIndex(
						editedAT => editedAT === at._id
					) != -1
						? at.Name
						: null
				);
			});
		});
	}

	onItemSelect(item: any) {
		console.log(item);
		console.log(this.menuItemForm.value);
	}

	OnItemDeSelect(item: any) {
		console.log(item);
		console.log(this.menuItemForm.value);
	}

	onSelectAll(items: any) {
		console.log(items);
	}

	onDeSelectAll(items: any) {
		console.log(items);
	}

	onChanges(): void {
		// Subscribe to changes on the selectAll checkbox
		this.menuItemForm.get("selectAll").valueChanges.subscribe(bool => {
			this.menuItemForm
				.get("MenuRestrictionType")
				.patchValue(Array(this.MenuRestrictionType.length).fill(bool), {
					emitEvent: false
				});
		});

		// Subscribe to changes on the menu restrictions checkboxes
		this.menuItemForm
			.get("MenuRestrictionType")
			.valueChanges.subscribe(val => {
				const allSelected = val.every(bool => bool);
				console.log(val, allSelected);
				if (this.menuItemForm.get("selectAll").value !== allSelected) {
					this.menuItemForm
						.get("selectAll")
						.patchValue(allSelected, { emitEvent: false });
				}
			});

		// Subscribe to changes on the dietary restrictions checkboxes
		this.menuItemForm.get("DietaryType").valueChanges.subscribe(val => {
			console.log(val);
		});
	}

	getAllergicTypes() {
		this.menuService.getAllergicType().subscribe(allergicTypes => {
			this.AllergicTypes = allergicTypes.data;
			const menuAllergicFormControls = allergicTypes.data.map(
				() => new FormControl(false)
			);
			console.log(
				this.AllergicTypes,
				this.menuItemForm.get("AllergicTypes")
			);
			this.menuItemForm.setControl(
				"AllergicTypes",
				new FormArray(menuAllergicFormControls)
			);
		});
	}

	getAllDietaryTypes() {
		this.menuService.getAllDietaryType().subscribe(DietaryType => {
			console.log(this.data);
			this.DietaryType = DietaryType.data;
			console.log(DietaryType.data);
			const menuDietaryTypeControls = DietaryType.data.map(
				() => new FormControl(false)
			);
			this.menuItemForm.setControl(
				"DietaryType",
				new FormArray(menuDietaryTypeControls)
			);
		});
	}

	getMenuSideDishes() {
		if (!this.auth.getRestaurantId()) {
			return;
		}
		this.menuService
			.getSideDishes(this.auth.getRestaurantId())
			.subscribe(sideDishes => {
				sideDishes.data.map((sidedish, index) => {
					this.sideDishes.push({
						_id: sidedish._id,
						id: index + 1,
						itemName: sidedish.Name,
						Description: sidedish.Description,
						RestaurantId: sidedish.RestaurantId,
						Price: sidedish.Price
					});
				});
			});
	}

	addExtraOption() {
		this.extraOptions.push({ name: "", price: null });
	}

	deleteExtraOption(index) {
		this.extraOptions.splice(index, 1);
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.menuItemForm.controls;
	}

	addMenuItem(formValue) {
		this.submitted = true;

		// stop here if form is invalid
		if (this.menuItemForm.invalid) {
			return;
		}

		// Filter out the unselected ids
		const selectedPreferences = formValue.MenuRestrictionType.map(
			(checked, index) =>
				checked ? this.MenuRestrictionType[index].name : null
		).filter(value => value !== null);

		// Filter out the unselected ids
		const selectedDietaryType = formValue.DietaryType.map(
			(checked, index) => (checked ? this.DietaryType[index]._id : null)
		).filter(value => value !== null);

		// Filter out the unselected ids
		const selectedAllergicTypes = formValue.AllergicTypes.map(
			(checked, index) => (checked ? this.AllergicTypes[index]._id : null)
		).filter(value => value !== null);

		console.log(selectedDietaryType);

		this.menuItem = formValue;
		this.menuItem.MenuType = this.MenuType;
		this.menuItem.MenuRestrictionType = selectedPreferences;
		this.menuItem.DietaryType = selectedDietaryType;
		this.menuItem.AllergicTypes = selectedAllergicTypes;
		this.extraOptions[0].name
			? (this.menuItem.ExtraOptions = this.extraOptions)
			: null;

		this.menuService
			.addMenuItem(this.data.category._id, this.menuItem)
			.subscribe(item => {
				this.menuItem._index = item.data.index;
				// this.menuItem._id = item.data._id;
				const index = item.data.MenuItems.findIndex(
					e => e.Name === this.menuItem.Name
				);
				this.menuItem._id = item.data.MenuItems[index]._id;
				this.dialogRef.close(this.menuItem);
			});
	}

	updateMenuItem(formValue) {
		// Filter out the unselected ids
		const selectedDietaryType = formValue.DietaryType.map(
			(checked, index) => (checked ? this.DietaryType[index]._id : null)
		).filter(value => value !== null);

		// Filter out the unselected ids
		const selectedAllergicTypes = formValue.AllergicTypes.map(
			(checked, index) => (checked ? this.AllergicTypes[index]._id : null)
		).filter(value => value !== null);

		console.log(selectedAllergicTypes);
		console.log(selectedDietaryType);

		this.extraOptions[0].name
			? (this.menuItem.ExtraOptions = this.extraOptions)
			: null;
		this.menuItem = { ...this.menuItem, ...this.menuItemForm.value };
		this.menuItem.DietaryType = selectedDietaryType;
		this.menuItem.AllergicTypes = selectedAllergicTypes;

		console.log("updateMenuItem", this.menuItem);

		this.menuService.updateMenuItem(this.menuItem).subscribe(data => {
			this.dialogRef.close(this.menuItem);
		});
	}

	subCategoryChange(item) {
		if (item !== "select") {
			console.log(this.menuItem, item);
			this.menuItem.SubCategory.id = item._id;
			this.menuItem.SubCategory.name = item.SubCategoryName;
		}
	}
}
