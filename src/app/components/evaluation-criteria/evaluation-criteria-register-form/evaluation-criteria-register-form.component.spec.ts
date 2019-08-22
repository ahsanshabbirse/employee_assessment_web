/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationCriteriaRegisterFormComponent } from './evaluation-criteria-register-form.component';

describe('EvaluationCriteriaRegisterFormComponent', () => {
  let component: EvaluationCriteriaRegisterFormComponent;
  let fixture: ComponentFixture<EvaluationCriteriaRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationCriteriaRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCriteriaRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
