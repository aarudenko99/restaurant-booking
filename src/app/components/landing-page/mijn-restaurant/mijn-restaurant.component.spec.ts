import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnRestaurantComponent } from './mijn-restaurant.component';

describe('MijnRestaurantComponent', () => {
  let component: MijnRestaurantComponent;
  let fixture: ComponentFixture<MijnRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MijnRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
