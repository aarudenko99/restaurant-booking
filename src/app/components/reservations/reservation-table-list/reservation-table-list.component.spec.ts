import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTableListComponent } from './reservation-table-list.component';

describe('ReservationTableListComponent', () => {
  let component: ReservationTableListComponent;
  let fixture: ComponentFixture<ReservationTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
