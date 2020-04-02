import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQuantityComponent } from './order-quantity.component';

describe('OrderQuantityComponent', () => {
  let component: OrderQuantityComponent;
  let fixture: ComponentFixture<OrderQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
