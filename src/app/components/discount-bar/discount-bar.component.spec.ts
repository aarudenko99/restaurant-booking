import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBarComponent } from './discount-bar.component';

describe('DiscountBarComponent', () => {
  let component: DiscountBarComponent;
  let fixture: ComponentFixture<DiscountBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
