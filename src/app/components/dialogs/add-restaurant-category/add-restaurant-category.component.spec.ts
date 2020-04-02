import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantCategoryComponent } from './add-restaurant-category.component';

describe('AddRestaurantCategoryComponent', () => {
  let component: AddRestaurantCategoryComponent;
  let fixture: ComponentFixture<AddRestaurantCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRestaurantCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
