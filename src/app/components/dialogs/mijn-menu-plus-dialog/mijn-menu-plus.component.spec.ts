import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnMenuPlusComponent } from './mijn-menu-plus.component';

describe('MijnMenuPlusComponent', () => {
  let component: MijnMenuPlusComponent;
  let fixture: ComponentFixture<MijnMenuPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MijnMenuPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnMenuPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
