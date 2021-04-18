import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedOperationsComponent } from './archived-operations.component';

describe('ArchivedOperationsComponent', () => {
  let component: ArchivedOperationsComponent;
  let fixture: ComponentFixture<ArchivedOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
