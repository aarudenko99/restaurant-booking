import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDateFilterComponent } from './graph-date-filter.component';

describe('GraphDateFilterComponent', () => {
  let component: GraphDateFilterComponent;
  let fixture: ComponentFixture<GraphDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
