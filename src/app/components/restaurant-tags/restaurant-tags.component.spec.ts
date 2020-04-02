import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTagsComponent } from './restaurant-tags.component';

describe('RestaurantTagsComponent', () => {
  let component: RestaurantTagsComponent;
  let fixture: ComponentFixture<RestaurantTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
