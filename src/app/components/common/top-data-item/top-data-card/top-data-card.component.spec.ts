import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDataCardComponent } from './top-data-card.component';

describe('TopDataCardComponent', () => {
  let component: TopDataCardComponent;
  let fixture: ComponentFixture<TopDataCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
