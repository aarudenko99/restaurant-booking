import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemTableComponent } from './menu-item-table.component';

describe('MenuItemTableComponent', () => {
  let component: MenuItemTableComponent;
  let fixture: ComponentFixture<MenuItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
