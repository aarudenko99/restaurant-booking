import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDialogComponent } from './offers-dialog.component';

describe('OffersDialogComponent', () => {
  let component: OffersDialogComponent;
  let fixture: ComponentFixture<OffersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
