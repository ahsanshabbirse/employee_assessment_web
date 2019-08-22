/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeeEvaluateEvaluationNotStartedModalComponent } from './employee-evaluate-evaluation-not-started-modal.component';

describe('EmployeeEvaluateEvaluationNotStartedModalComponent', () => {
  let component: EmployeeEvaluateEvaluationNotStartedModalComponent;
  let fixture: ComponentFixture<EmployeeEvaluateEvaluationNotStartedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEvaluateEvaluationNotStartedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEvaluateEvaluationNotStartedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
