import { Component, OnInit } from '@angular/core';
import { EvaluationCriteria } from 'src/app/models/EvaluationCriteria';
import { ResponseData } from 'src/app/models/ResponseData';
import { EvaluationCriteriaService } from 'src/app/services/evaluationCriteria.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Department } from 'src/app/models/Department';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationCriteriaModifyModalComponent } from './evaluation-criteria-modify-modal/evaluation-criteria-modify-modal.component';

@Component({
  selector: 'app-evaluation-criteria',
  templateUrl: './evaluation-criteria.component.html',
  styleUrls: ['./evaluation-criteria.component.css']
})
export class EvaluationCriteriaComponent implements OnInit {
  evaluationCriteria: EvaluationCriteria[];
  private responseData: ResponseData;
  private loggedInUserDepartment: Department;

  evalutionStatusActive = false;
  evaluationMessage: string;
  evaluationButtonText = 'Start Evaluation';

  constructor(
    private evaluationCriteriaService: EvaluationCriteriaService,
    private route: ActivatedRoute,
    public utilsService: UtilsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // this.getResolverData();
    this.checkEvaluationStatus();
    this.getEvaluationCriteria();
  }

  private checkEvaluationStatus() {
    this.loggedInUserDepartment = this.utilsService.getDepartment();
    this.evaluationMessage = 'Evaluation Criteria is NOT yet Broadcasted to ' + this.loggedInUserDepartment.name + ' Employees!!!' ;
    if (this.loggedInUserDepartment.evaluationStatus) {
      this.evalutionStatusActive = true;
      this.evaluationButtonText = 'Evaluation Started';
      this.evaluationMessage = 'Evaluation Criteria is Broadcasted to ' + this.loggedInUserDepartment.name + ' Employees!!!' ;
    }
  }

  // private getResolverData() {
  //   this.route.data.subscribe(data => {
  //     this.responseData = data.evaluationCriteriaList;
  //     this.evaluationCriteria = this.responseData.data.evaluationCriteriaList;
  //     console.log(this.evaluationCriteria);
  //   });
  // }

  private getEvaluationCriteria() {
    this.evaluationCriteriaService
      .getEvaluationCriteria(this.loggedInUserDepartment.departmentId)
      .subscribe(
        (data: ResponseData) => {
          this.responseData = data;
          this.evaluationCriteria = this.responseData.data.evaluationCriteriaList;
        },
        error => {
          console.log(error);
        }
      );
  }

  private updateEvaluationCriteriaStatus(status: boolean) {
    this.loggedInUserDepartment.evaluationStatus = status;
    this.evaluationCriteriaService
        .updateEmployeeStatus(
          this.loggedInUserDepartment
        )
        .subscribe((responseData: ResponseData) => {
          this.responseData = responseData;
          this.utilsService.setLoggedInDepartmentDetails(this.loggedInUserDepartment);
          console.log(this.responseData.responseMessage);
        });
  }

  receiveUpdatedEvaluationCriteria(evaluationCriteria) {
    this.evaluationCriteria = evaluationCriteria;
    console.log(this.evaluationCriteria);
  }

  private toogleEvaluation() {
    if (!this.evalutionStatusActive) {
      this.evalutionStatusActive = true;
      this.updateEvaluationCriteriaStatus(true);
      this.evaluationButtonText = 'Evaluation Started';
      this.evaluationMessage = 'Evaluation Criteria is Broadcasted to ' + this.loggedInUserDepartment.name + ' Employees!!!' ;
    } else {
      this.evalutionStatusActive = false;
      this.updateEvaluationCriteriaStatus(false);
      this.evaluationButtonText = 'Start Evaluation';
      this.evaluationMessage = 'Evaluation Criteria is NOT yet Broadcasted to ' + this.loggedInUserDepartment.name + ' Employees!!!' ;
    }
  }

  openConfirmationModal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result)=>{
      if(result){
        this.toogleEvaluation();
      }
    }, (reason) => {
      console.log(this.utilsService.getModalDismissReason(reason));
    })
  }
  
  openCriteriaModifyModal(criteria: EvaluationCriteria){
    const modalRef = this.modalService.open(EvaluationCriteriaModifyModalComponent, {size: 'sm', centered: true});
    modalRef.componentInstance.criteria = criteria;
  }
}
