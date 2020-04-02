import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	Injector,
	Input,
	ChangeDetectorRef
} from "@angular/core";
import { WizardService } from "../../../services/wizard.service";
import { WizardController } from "../../../controllers/wizard/wizard.controller";
import OpeningHours from "../../../common/models/restaurant/opening-hours";
import moment from "moment";

@Component({
	selector: "mm-restaurant-details",
	templateUrl: "./restaurant-details.component.html",
	styleUrls: ["./restaurant-details.component.scss"]
})
export class RestaurantDetailsComponent extends WizardController
	implements OnInit {
	openingTime = { hour: 13, minute: 30 };
	@Input() validateTime: boolean;
	@Output() saveValue = new EventEmitter<any>();
	days = OpeningHours;
	touchTimeZone: boolean;
	timeSlotArray = [
		{
			type: "Breakfast",
			validate: false,
			timeslot: [],
			from: { hour: 8, minute: 0o0 },
			till: { hour: 11, minute: 0o0 }
		},
		{
			type: "Lunch",
			validate: false,
			timeslot: [],
			from: { hour: 12, minute: 0o0 },
			till: { hour: 17, minute: 0o0 }
		},
		{
			type: "Dinner",
			validate: false,
			timeslot: [],
			from: { hour: 18, minute: 0o0 },
			till: { hour: 23, minute: 0o0 }
		}
	];
	constructor(
		injector: Injector,
		private cd: ChangeDetectorRef,
		public wizardService: WizardService
	) {
		super(injector);
	}

	ngOnInit() {
		this.touchTimeZone = false;
		this.setupWizardForms("details");
		this.timeSlotArray.forEach((element, index) => {
			this.timeSlotValidate(element, index);
		});
		this.days.forEach((element, index) => {
			this.changeTime(element, index, "init");
		});
		if (this.wizardService.editRestaurant.value) {
			this.setOpeningHours();
			this.setTimeSlots();
		}
	}

	setOpeningHours() {
		this.wizardService.formData.OpeningHours.map((day, index) => {
			const splittedOpeningTime = day.openingTime.split(":");
			const splittedClosingTime = day.closingTime.split(":");
			const selectedOpeningTime = {
				hour: +splittedOpeningTime[0],
				minute: +splittedOpeningTime[1]
			};
			const selectedClosingTime = {
				hour: +splittedClosingTime[0],
				minute: +splittedClosingTime[1]
			};

			this.days[index].openingTime = day.openingTime;
			this.days[index].closingTime = day.closingTime;
			this.days[index].isClosed = day.isClosed;
			this.days[index].selectedOpeningTime = selectedOpeningTime;
			this.days[index].selectedClosingTime = selectedClosingTime;
		});
	}

	setTimeSlots() {
		for (var property in this.wizardService.formData.TimeSlots[0]) {
			this.timeSlotArray.map(timeslot => {
				if (timeslot.type === property) {
					timeslot.timeslot = this.wizardService.formData.TimeSlots[0][
						property
					];
					const splittedFromTime = timeslot.timeslot[0].split(":");
					const splittedTillTime = timeslot.timeslot[
						timeslot.timeslot.length - 1
					].split(":");
					const from = {
						hour: +splittedFromTime[0],
						minute: +splittedFromTime[1]
					};
					const till = {
						hour: +splittedTillTime[0],
						minute: +splittedTillTime[1]
					};

					timeslot.from = from;
					timeslot.till = till;
				}
			});
		}
	}

	updateFrom(form) {
		this.form = form;
	}

	changeTime(day, index, init) {
		let openTimeHour = "";
		let closeTimeHour = "";
		let openTimeMinute = "";
		let closeTimeMinute = "";
		if (init === "") {
			this.touchTimeZone = true;
		}
		if (day.selectedOpeningTime.hour.toString().length === 1) {
			openTimeHour = "0" + day.selectedOpeningTime.hour.toString();
		} else {
			openTimeHour = day.selectedOpeningTime.hour;
		}
		if (day.selectedClosingTime.hour.toString().length === 1) {
			closeTimeHour = "0" + day.selectedClosingTime.hour.toString();
		} else {
			closeTimeHour = day.selectedClosingTime.hour;
		}
		if (day.selectedOpeningTime.minute.toString().length === 1) {
			openTimeMinute = "0" + day.selectedOpeningTime.minute.toString();
		} else {
			openTimeMinute = day.selectedOpeningTime.minute;
		}
		if (day.selectedClosingTime.minute.toString().length === 1) {
			closeTimeMinute = "0" + day.selectedClosingTime.minute.toString();
		} else {
			closeTimeMinute = day.selectedClosingTime.minute;
		}
		console.log(openTimeHour, closeTimeMinute);
		if (day.selectedOpeningTime) {
			this.days[index].openingTime = openTimeHour + ":" + openTimeMinute;
		}
		if (day.selectedClosingTime) {
			this.days[index].closingTime =
				closeTimeHour + ":" + closeTimeMinute;
		}
		this.checkOpeningAndClosingHour(day, index);
	}

	timeSlotValidate(timeslot, index) {
		if (timeslot.from && timeslot.till) {
			const typetimeslot = [];
			const len = timeslot.till.hour - timeslot.from.hour + 1;
			if (len > 0) {
				let hour = timeslot.from.hour;
				let minute = "";
				if (hour.toString().length === 1) {
					hour = "0" + hour;
				}
				if (timeslot.from.minute.toString().length === 1) {
					minute = "0" + timeslot.from.minute;
				} else {
					minute = timeslot.from.minute;
				}
				for (let i = 0; i < len; i++) {
					typetimeslot.push(hour + ":" + minute);
					hour++;
				}
				this.timeSlotArray[index].timeslot = typetimeslot;
				this.timeSlotArray[index].validate = true;
			} else {
				this.timeSlotArray[index].validate = false;
			}
		} else {
			this.timeSlotArray[index].validate = false;
		}
	}

	selectValue(value) {
		const object = this.wizardService.restaurantCategories.filter(
			item => item._id === value
		);
		this.wizardService.formData.RestaurantCategoryName = object[0].Name;
		this.wizardService.formData.RestaurantCategoryId = value;
	}

	checkIsCloesed(event, i) {
		this.touchTimeZone = true;
		if (event.checked) {
			this.days[i].validate = true;
		} else {
			this.checkOpeningAndClosingHour(this.days[i], i);
		}
	}

	checkOpeningAndClosingHour(day, index) {
		if (day.selectedClosingTime && day.selectedOpeningTime) {
			this.days[index].validate = true;
		} else {
			if (this.days[index].isClosed) {
				this.days[index].validate = true;
			} else {
				this.days[index].validate = false;
			}
		}
	}
}
