import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDataItemComponent } from './top-data-item.component';

describe('TopDataItemComponent', () => {
  let component: TopDataItemComponent;
  let fixture: ComponentFixture<TopDataItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDataItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
