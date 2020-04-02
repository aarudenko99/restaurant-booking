import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgDialogComponent } from './avg-dialog.component';

describe('AvgDialogComponent', () => {
  let component: AvgDialogComponent;
  let fixture: ComponentFixture<AvgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
