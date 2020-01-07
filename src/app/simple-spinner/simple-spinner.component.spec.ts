import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSpinnerComponent } from './simple-spinner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SimpleSpinnerComponent', () => {
  let component: SimpleSpinnerComponent;
  let fixture: ComponentFixture<SimpleSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSpinnerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
