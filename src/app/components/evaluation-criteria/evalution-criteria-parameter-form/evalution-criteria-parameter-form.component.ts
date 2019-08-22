import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/models/ResponseData';
import { EvaluationParameter } from 'src/app/models/EvaluationParameter';
import { EvaluationParameterService } from 'src/app/services/evaluationParameter.service';

@Component({
  selector: 'app-evalution-criteria-parameter-form',
  templateUrl: './evalution-criteria-parameter-form.component.html',
  styleUrls: ['./evalution-criteria-parameter-form.component.css']
})
export class EvalutionCriteriaParameterFormComponent implements OnInit {

  evaluationParameterForm: FormGroup;
  evaluationParameter: EvaluationParameter;
  private responseData: ResponseData;

  constructor(private evaluationParameterService: EvaluationParameterService, private formBuilder: FormBuilder, private router: Router) {
    this.evaluationParameter = new EvaluationParameter();
  }

  ngOnInit() {

    this.validateDepartemntForm();

  }

  validateDepartemntForm() {
    this.evaluationParameterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(24), Validators.pattern('^[a-zA-Z\\s]*$')]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]]
    });
  }


  registerDepartment() {
    if (this.evaluationParameterForm.valid) {
      this.evaluationParameter.name = this.evaluationParameterForm.get('name').value;
      this.evaluationParameter.description = this.evaluationParameterForm.get('description').value;
      this.evaluationParameterService.registerEvaluationParameter(this.evaluationParameter).subscribe(data => {
        this.responseData = data;
        console.log(this.responseData.responseMessage);
      }, error => {
        console.log(error);
      }, () => {
        this.router
        this.router.navigate(['/evaluation-criteria']);
      });
    }
  }

}
