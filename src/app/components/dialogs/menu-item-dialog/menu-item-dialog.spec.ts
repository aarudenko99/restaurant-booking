import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDialogComponent } from './menu-item-dialog';

describe('MenuItemDialogComponent', () => {
  let component: MenuItemDialogComponent;
  let fixture: ComponentFixture<MenuItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
