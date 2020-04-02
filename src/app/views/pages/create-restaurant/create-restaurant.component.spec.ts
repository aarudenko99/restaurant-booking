import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantPageComponent } from './create-restaurant.component';

describe('CreateRestaurantPageComponent', () => {
  let component: CreateRestaurantPageComponent;
  let fixture: ComponentFixture<CreateRestaurantPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestaurantPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
