import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MollieSubscriptionComponent } from './mollie-subscription.component';

describe('MollieSubscriptionComponent', () => {
  let component: MollieSubscriptionComponent;
  let fixture: ComponentFixture<MollieSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MollieSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MollieSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
