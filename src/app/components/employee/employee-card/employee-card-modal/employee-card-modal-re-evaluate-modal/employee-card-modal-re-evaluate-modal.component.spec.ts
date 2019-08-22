/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeeCardModalReEvaluateModalComponent } from './employee-card-modal-re-evaluate-modal.component';

describe('EmployeeCardModalReEvaluateModalComponent', () => {
  let component: EmployeeCardModalReEvaluateModalComponent;
  let fixture: ComponentFixture<EmployeeCardModalReEvaluateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCardModalReEvaluateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardModalReEvaluateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
