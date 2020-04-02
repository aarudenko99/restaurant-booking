import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewItemsComponent } from './review-items.component';

describe('ReviewItemsComponent', () => {
  let component: ReviewItemsComponent;
  let fixture: ComponentFixture<ReviewItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
