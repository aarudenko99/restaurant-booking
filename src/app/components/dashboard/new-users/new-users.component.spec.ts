import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersComponent } from './new-users.component';

describe('NewUsersComponent', () => {
  let component: NewUsersComponent;
  let fixture: ComponentFixture<NewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
