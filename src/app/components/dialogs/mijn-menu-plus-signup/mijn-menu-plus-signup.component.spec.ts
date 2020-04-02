import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnMenuPlusSignupComponent } from './mijn-menu-plus-signup.component';

describe('MijnMenuPlusSignupComponent', () => {
  let component: MijnMenuPlusSignupComponent;
  let fixture: ComponentFixture<MijnMenuPlusSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MijnMenuPlusSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnMenuPlusSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
