import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuItemsComponent } from './top-menu-items.component';

describe('TopMenuItemsComponent', () => {
  let component: TopMenuItemsComponent;
  let fixture: ComponentFixture<TopMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
