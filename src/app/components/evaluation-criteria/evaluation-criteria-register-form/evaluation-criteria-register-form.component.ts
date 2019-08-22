import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EvaluationCriteria } from "src/app/models/EvaluationCriteria";
import { Department } from "src/app/models/Department";
import { ResponseData } from "src/app/models/ResponseData";
import { EvaluationParameter } from "src/app/models/EvaluationParameter";
import { EvaluationCriteriaService } from "src/app/services/evaluationCriteria.service";
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-evaluation-criteria-register-form",
  templateUrl: "./evaluation-criteria-register-form.component.html",
  styleUrls: ["./evaluation-criteria-register-form.component.css"]
})
export class EvaluationCriteriaRegisterFormComponent implements OnInit {
  @Output() evaluationCriteriaUpdated = new EventEmitter<EvaluationCriteria[]>();

  evaluationCriteriaRegisterForm: FormGroup;
  parameters: EvaluationParameter[];

  private evaluationCriteria: EvaluationCriteria;
  private responseData: ResponseData;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private evaluationCriteriaService: EvaluationCriteriaService,
    private utils: UtilsService
  ) {
    this.evaluationCriteria = new EvaluationCriteria();
    this.evaluationCriteria.evaluationParameter = new EvaluationParameter();
    this.evaluationCriteria.department = new Department();
  }

  ngOnInit() {
    this.getEvaluationParameterList();
    this.validateEvaluationCriteriaRegisterForm();
  }

  private getEvaluationParameterList() {
    this.route.data.subscribe(
      data => {
        this.responseData = data.evaluationParameterList;
        this.parameters = this.responseData.data.evaluationParameterList;
      },
      error => {
        console.log(error);
      }
    );
  }

  private getEvaluationCriteria() {
    this.evaluationCriteriaService
      .getEvaluationCriteria(this.utils.getDepartment().departmentId)
      .subscribe((data: ResponseData) => {
        this.responseData = data;
      }, error=>{
        console.log(error);
      }, () => {
        this.evaluationCriteriaUpdated.emit(this.responseData.data.evaluationCriteriaList);
      });
  }

  validateEvaluationCriteriaRegisterForm() {
    this.evaluationCriteriaRegisterForm = this.formBuilder.group({
      parameter: ["0", Validators.required],
      category: ["0", Validators.required]
    }, { validators: this.customCriteriaValidator});
  }

  private customCriteriaValidator(formvalue: FormGroup) {
    return formvalue.get('parameter').value !== '0' && formvalue.get('category').value !== '0'  ? null : { 'mismatch': true };
  }

  registerEvaluationCriteria() {
    if (this.evaluationCriteriaRegisterForm.valid) {
      this.evaluationCriteria.evaluationParameter.evaluationParameterId = this.evaluationCriteriaRegisterForm.get(
        "parameter"
      ).value;
      this.evaluationCriteria.evaluationCategory = this.evaluationCriteriaRegisterForm.get(
        "category"
      ).value;
      this.evaluationCriteria.department.departmentId = this.utils.getDepartment().departmentId;

      this.evaluationCriteriaService
        .createEvaluationCriteria(this.evaluationCriteria)
        .subscribe(
          (responseData: ResponseData) => {
            this.responseData = responseData;
            console.log(this.responseData.responseMessage);
          },
          error => {
            console.log(error);
          },
          () => {
            this.getEvaluationCriteria();
          }
        );
    }
  }
}
