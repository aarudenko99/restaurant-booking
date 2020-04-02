import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPerformanceComponent } from './menu-performance.component';

describe('MenuPerformanceComponent', () => {
  let component: MenuPerformanceComponent;
  let fixture: ComponentFixture<MenuPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
