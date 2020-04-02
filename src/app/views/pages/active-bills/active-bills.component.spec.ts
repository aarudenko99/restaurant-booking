import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBillsComponent } from './active-bills.component';

describe('ActiveBillsComponent', () => {
  let component: ActiveBillsComponent;
  let fixture: ComponentFixture<ActiveBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
