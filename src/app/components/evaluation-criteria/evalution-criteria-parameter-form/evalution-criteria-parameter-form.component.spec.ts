/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvalutionCriteriaParameterFormComponent } from './evalution-criteria-parameter-form.component';

describe('EvalutionCriteriaParameterFormComponent', () => {
  let component: EvalutionCriteriaParameterFormComponent;
  let fixture: ComponentFixture<EvalutionCriteriaParameterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalutionCriteriaParameterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionCriteriaParameterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
