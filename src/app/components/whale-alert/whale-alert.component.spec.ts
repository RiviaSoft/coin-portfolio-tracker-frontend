import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhaleAlertComponent } from './whale-alert.component';

describe('WhaleAlertComponent', () => {
  let component: WhaleAlertComponent;
  let fixture: ComponentFixture<WhaleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhaleAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhaleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
