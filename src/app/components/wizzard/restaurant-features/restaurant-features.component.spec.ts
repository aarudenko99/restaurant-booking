import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFeaturesComponent } from './restaurant-features.component';

describe('RestaurantFeaturesComponent', () => {
  let component: RestaurantFeaturesComponent;
  let fixture: ComponentFixture<RestaurantFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
