import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableOrderComponent } from './edit-table-order.component';

describe('EditTableOrderComponent', () => {
  let component: EditTableOrderComponent;
  let fixture: ComponentFixture<EditTableOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
