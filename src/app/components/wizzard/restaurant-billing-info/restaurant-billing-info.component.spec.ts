import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBillingInfoComponent } from './restaurant-billing-info.component';

describe('RestaurantBillingInfoComponent', () => {
  let component: RestaurantBillingInfoComponent;
  let fixture: ComponentFixture<RestaurantBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantBillingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
