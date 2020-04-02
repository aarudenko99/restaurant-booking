import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieStatementComponent } from './cookie-statement.component';

describe('CookieStatementComponent', () => {
  let component: CookieStatementComponent;
  let fixture: ComponentFixture<CookieStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
