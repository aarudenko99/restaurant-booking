import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFeaturesCheckboxesComponent } from './restaurant-features-checkboxes.component';

describe('RestaurantFeaturesCheckboxesComponent', () => {
	let component: RestaurantFeaturesCheckboxesComponent;
	let fixture: ComponentFixture<RestaurantFeaturesCheckboxesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RestaurantFeaturesCheckboxesComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RestaurantFeaturesCheckboxesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
