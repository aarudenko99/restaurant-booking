import {
	Component,
	OnInit,
	ViewChild,
	Injector,
	TemplateRef,
	ComponentRef,
	ComponentFactoryResolver,
	ApplicationRef,
	ChangeDetectorRef
} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, BusinessHoursInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { AbstractController } from '../../../controllers/abstract/abstract.controller';
import { ReservationService } from '../../../services/reservation.service';
import { CalendarPopoverComponent } from './calendar-popover/calendar-popover.component';
import { Reservations } from '../../../common/models/reservations';
// import Tooltip from 'tooltip.js';
import moment from 'moment';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';

@Component({
	selector: 'mm-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends AbstractController implements OnInit {
	@ViewChild('fullcalendar', { static: true }) fullcalendar: FullCalendarComponent;

	@ViewChild('popoverTmpl', { static: true }) popoverTmpl: TemplateRef<any>;

	popoversMap = new Map<any, ComponentRef<CalendarPopoverComponent>>();
	layoutUtilsService: LayoutUtilsService;
	popoverFactory = this.resolver.resolveComponentFactory(CalendarPopoverComponent);
	eventClass: string;

	reservations: any;
	calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
	calendarEvents: EventInput[] = [];
	businessHours: BusinessHoursInput[] = [];
	timeFormat = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};

	reservationService: ReservationService;

	constructor(
		injector: Injector,
		private resolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private cd: ChangeDetectorRef
	) {
		super(injector);
		this.layoutUtilsService = this.injector.get(LayoutUtilsService);
		this.reservationService = this.injector.get(ReservationService);
		// this.businessHours = [
		//     {
		//         daysOfWeek: [ 5, 6, 0 ], // Friday, Saturday, Sunday
		//         startTime: '10:00', // 10am
		//         endTime: '00:00' // 4pm
		//     },
		//     {
		//         daysOfWeek: [ 1, 2, 3, 4 ], // Monday, Tuesday, Wednesday, Thursday
		//         startTime: '08:00', // 8am
		//         endTime: '23:00' // 6pm
		//     },
		// ]
	}

	ngOnInit() {
		this.getReservations();
		console.log('ngOnInit');
	}

	getReservations() {
		console.log('getReservations', this.SelectedRestaurant);
		if (this.SelectedRestaurantId) {
			this.reservationService.getReservations(this.SelectedRestaurantId).subscribe(
				data => {
					this.reservations = data.data;
					if (this.reservations != null) {
						this.reservations.forEach(value => {
							const startdatetime = new Date(value.TableReservationDate);
							const enddatetime = startdatetime.setHours(startdatetime.getHours() + 2);
							const event = {
								id: value._id,
								event_id: value._id,
								tableId: value.TableId,
								title: value.FirstName + ' ' + value.LastName,
								phoneNumber: value.Phonenumber,
								reservationCode: value.ReservationCode,
								comments: value.Comments,
								personQty: value.TableReservationQuantity,
								restaurant: value.RestaurantName,
								eventType: this.determineEventType(startdatetime.getHours()),
								start: new Date(value.TableReservationDate),
								end: new Date(enddatetime),
								allDay: false
							};
							this.calendarEvents = this.calendarEvents.concat(event);
						});
						this.cd.detectChanges();
					}
					// Helpers.setLoading(false);
				},
				error => {
					// Helpers.setLoading(false);
				}
			);
		}
	}

	updateReservation(event) {
		const newStartDate = event.event.start;
		const reservationId = event.event.id;
		const index = this.reservations.findIndex(e => e._id === reservationId);
		const reservation = this.reservations[index];
		reservation.TableReservationDate = moment(newStartDate).format();

		this.reservationService.updateReservations(reservation).subscribe(() => {
			const deleteMessage = `You have updated the time of reservation ${reservation.FirstName} ${reservation.LastName}`;
			this.layoutUtilsService.showActionNotification(deleteMessage, MessageType.Delete);
		});
	}

	determineEventType(hours: number) {
		if (hours < 11) {
			return { class: 'brandeis', type: 'Breakfast' };
		} else if (hours < 17) {
			return { class: 'flame', type: 'Lunch' };
		} else {
			return { class: 'amber', type: 'Dinner' };
		}
	}

	togglePopover(event) {
		const popover = this.popoversMap.get(event.el);
		if (popover.instance.popover.isOpen()) {
			popover.instance.popover.close();
		} else {
			popover.instance.popover.open({ event: event.event });
		}
	}

	addEvent() {
		const event = { title: 'event 2', date: '2019-07-23' };
		// console.log(event);
		this.calendarEvents = this.calendarEvents.concat(event);
	}

	renderTooltip(event) {
		// console.log(event.event.extendedProps);
		event.el.classList.add('fc-event-' + event.event.extendedProps.eventType.class);
		// console.log(event.el.classList, event.event.extendedProps.eventType);
		const projectableNodes = Array.from(event.el.childNodes);

		const compRef = this.popoverFactory.create(this.injector, [projectableNodes], event.el);
		compRef.instance.template = this.popoverTmpl;

		this.appRef.attachView(compRef.hostView);
		this.popoversMap.set(event.el, compRef);
	}

	destroyTooltip(event) {
		const popover = this.popoversMap.get(event.el);
		if (popover) {
			this.appRef.detachView(popover.hostView);
			popover.destroy();
			this.popoversMap.delete(event.el);
		}
	}

	// handleDateClick(arg) {
	//     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
	//       this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
	//         title: 'New Event',
	//         start: arg.date,
	//         allDay: arg.allDay
	//       });
	//     }
	// }
}
