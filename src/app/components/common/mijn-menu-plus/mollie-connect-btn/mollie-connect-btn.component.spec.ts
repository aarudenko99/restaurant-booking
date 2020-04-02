import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MollieConnectBtnComponent } from './mollie-connect-btn.component';

describe('MollieConnectBtnComponent', () => {
  let component: MollieConnectBtnComponent;
  let fixture: ComponentFixture<MollieConnectBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MollieConnectBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MollieConnectBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
