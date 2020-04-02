import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBillComponent } from './table-bill.component';

describe('TableBillComponent', () => {
  let component: TableBillComponent;
  let fixture: ComponentFixture<TableBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
