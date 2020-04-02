import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBoxWaveComponent } from './icon-box-wave.component';

describe('IconBoxWaveComponent', () => {
  let component: IconBoxWaveComponent;
  let fixture: ComponentFixture<IconBoxWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBoxWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBoxWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
