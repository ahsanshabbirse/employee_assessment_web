import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/models/Employee";
import { ResponseData } from "src/app/models/ResponseData";
import { EmployeeEvaluationService } from "src/app/services/employeeEvaluation.service";
import { UtilsService } from "src/app/services/utils.service";
import { EmployeeEvaluation } from "src/app/models/EmployeeEvaluation";
import { Router } from "@angular/router";
import { EmployeeEvaluateModalComponent } from "./employee-evaluate-modal/employee-evaluate-modal.component";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: max-line-length
import { EmployeeEvaluateEvaluationNotStartedModalComponent } from './employee-evaluate-evaluation-not-started-modal/employee-evaluate-evaluation-not-started-modal.component';

@Component({
  selector: "app-employee-evaluate",
  templateUrl: "./employee-evaluate.component.html",
  styleUrls: ["./employee-evaluate.component.css"]
})
export class EmployeeEvaluateComponent implements OnInit {
  employee: Employee;
  loggedInEmployee: Employee;
  responseData: ResponseData;
  modalRef: BsModalRef;

  employeeEvaluation: EmployeeEvaluation;
  employeeEvaluationList: EmployeeEvaluation[] = [];

  isManager = false; // flag to check if loggedIn user is Manager
  isSelfEvaluated = false; // flag to check if the employee/teamMember evaluated him/her self
  selfModifyAccess = false; // flag to check if employee/teamMember is allowed to modify the evaluation 
  managerModifyAccess = false; // flag to check if manager is allowed to modify the employee evaluation

  constructor(
    private employeeEvaluationService: EmployeeEvaluationService,
    public utilsService: UtilsService,
    private router: Router,
    private modalService: BsModalService,
    private ngbModalService: NgbModal
  ) {}

  ngOnInit() {
    this.employee = this.utilsService.getEmployeeDetails();
    this.checkDesignation();
    this.performOperationOnStatus();
  }

  // checks if the user accessing the employee is Manager or Not
  private checkDesignation() {
    this.loggedInEmployee = this.utilsService.getEmployee();
    if (this.loggedInEmployee.designation === 2) {
      if (this.loggedInEmployee.level > this.employee.level) {
        this.isManager = true;
      }
    }
    return this.isManager;
  }

  private performOperationOnStatus() {
    if (this.employee.evaluationStatus === 0) {
      this.openModal();
    }
    if (this.isManager) {
      if (
        this.employee.evaluationStatus === 1 ||
        this.employee.evaluationStatus === 2
      ) {
        this.getEvaluationPerformedByEmployee();
      } else if (this.employee.evaluationStatus === 3) {
        this.isSelfEvaluated = true;
        this.managerModifyAccess = true;
        this.getEvaluationPerformedByEmployee();
      } else if (this.employee.evaluationStatus === 5) {
        this.isSelfEvaluated = true;
        this.getEvaluationPerformedByEmployee();
      }
    } else {
      if (this.employee.evaluationStatus === 1) {
        this.selfModifyAccess = true;
        this.getParameterList();
      } else if (this.employee.evaluationStatus === 2) {
        this.selfModifyAccess = true;
        this.getEvaluationPerformedByEmployee();
      } else if (this.employee.evaluationStatus === 3) {
        this.isSelfEvaluated = true;
        // this.managerModifyAccess = true;
        this.getEvaluationPerformedByEmployee();
      } else if (this.employee.evaluationStatus === 4) {
        console.log("Implementation Pendding");
      } else if (this.employee.evaluationStatus === 5) {
        this.isSelfEvaluated = true;
        this.getEvaluationPerformedByEmployee();
      }
    }
  }

  private getParameterList() {
    // fetching evaluation parameters against specific department from evaluation criteria table

    this.employeeEvaluationService
      .getEvaluationCriteria(this.employee.department.departmentId)
      .subscribe(
        (responseData: ResponseData) => {
          this.responseData = responseData;
          for (const criteria of this.responseData.data
            .evaluationCriteriaList) {
            this.employeeEvaluation = new EmployeeEvaluation();
            this.employeeEvaluation.employee = this.employee;
            this.employeeEvaluation.evaluationParameterName =
              criteria.evaluationParameter.name;
            this.employeeEvaluation.evaluationParameterCategory =
              criteria.evaluationCategory;
            this.employeeEvaluation.selfRatedValue = 0;
            this.employeeEvaluationList.push(this.employeeEvaluation);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  private getEvaluationPerformedByEmployee() {
    // fetching evaluation parameters against specific employee from employee evaluation table
    this.employeeEvaluationService
      .getEvaluationPerformedByEmployee(this.employee.employeeId, this.employee.department.evaluationStartTimestamp)
      .subscribe((responseData: ResponseData) => {
        this.responseData = responseData;
        this.employeeEvaluationList = this.responseData.data.employeeEvaluationList;
      });
  }

  // displays Evaluation Not Started Message
  private openModal() {
    const modalRef = this.ngbModalService.open(EmployeeEvaluateEvaluationNotStartedModalComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.employee = this.loggedInEmployee;
    this.navigate();
  }

  private navigate() {
    if (this.loggedInEmployee.designation === 2) {
      this.router.navigate(["/employee"]);
    } else {
      this.router.navigate(["/employee-details"]);
    }
  }

  private updateEmployeeEvaluationStatus() {
    this.employeeEvaluationService
      .updateEmployeeStatus(this.employee)
      .subscribe(
        (responseDataUpdate: ResponseData) => {
          this.responseData = responseDataUpdate;
        },
        error => {
          console.log(error);
        },
        () => {
          if (this.loggedInEmployee.employeeId === this.employee.employeeId) {
            this.loggedInEmployee.evaluationStatus = this.employee.evaluationStatus;
          }
          this.navigate();
        }
      );
  }

  // save submitted record in database against employee evaluation
  evaluateEmployee() {
    console.log(this.employeeEvaluationList);
    this.employeeEvaluationService
      .addEmployeeEvaluation(this.employeeEvaluationList)
      .subscribe(
        (responseData: ResponseData) => {
          this.responseData = responseData;
          console.log(this.employee);
          if (this.employee.evaluationStatus === 1) {
            this.employee.evaluationStatus = 2;
            console.log(this.employee);
            this.updateEmployeeEvaluationStatus();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  // display confirmation modal to change the status of employee
  openConfirmationModal() {
    this.modalRef = this.modalService.show(EmployeeEvaluateModalComponent);
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.employee.evaluationStatus = 3;
        if (this.isManager) {
          this.employee.evaluationStatus = 5;
        }
        this.updateEmployeeEvaluationStatus();
      }
    });
  }
}
