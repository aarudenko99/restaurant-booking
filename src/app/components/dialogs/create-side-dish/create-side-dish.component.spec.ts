import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSideDishComponent } from './create-side-dish.component';

describe('CreateSideDishComponent', () => {
  let component: CreateSideDishComponent;
  let fixture: ComponentFixture<CreateSideDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSideDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSideDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
