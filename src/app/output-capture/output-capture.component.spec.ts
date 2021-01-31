import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCaptureComponent } from './output-capture.component';

describe('OutputCaptureComponent', () => {
  let component: OutputCaptureComponent;
  let fixture: ComponentFixture<OutputCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
