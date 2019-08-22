import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeEvaluationService } from 'src/app/services/employeeEvaluation.service';
import { ResponseData } from 'src/app/models/ResponseData';

@Component({
  selector: 'app-employee-card-modal-re-evaluate-modal',
  templateUrl: './employee-card-modal-re-evaluate-modal.component.html',
  styleUrls: ['./employee-card-modal-re-evaluate-modal.component.css']
})
export class EmployeeCardModalReEvaluateModalComponent implements OnInit {
  @Input() employee: Employee;
  responseData: ResponseData;

  constructor(public activeModal: NgbActiveModal, private employeeEvaluationService: EmployeeEvaluationService) { }

  ngOnInit() {
  }

  reEvaluate(status: number){
    this.employee.evaluationStatus = status;
    this.employeeEvaluationService
    .updateEmployeeStatus(this.employee)
    .subscribe(
      (responseDataUpdate: ResponseData) => {
        this.responseData = responseDataUpdate;
        this.activeModal.close();
      },
      error => {
        console.log(error);
      }
    );
  }

}
