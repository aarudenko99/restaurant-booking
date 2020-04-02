import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableDialogComponent } from './create-table-dialog.component';

describe('CreateTableDialogComponent', () => {
  let component: CreateTableDialogComponent;
  let fixture: ComponentFixture<CreateTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
