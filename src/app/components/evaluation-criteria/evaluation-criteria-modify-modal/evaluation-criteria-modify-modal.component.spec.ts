/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationCriteriaModifyModalComponent } from './evaluation-criteria-modify-modal.component';

describe('EvaluationCriteriaModifyModalComponent', () => {
  let component: EvaluationCriteriaModifyModalComponent;
  let fixture: ComponentFixture<EvaluationCriteriaModifyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationCriteriaModifyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCriteriaModifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
