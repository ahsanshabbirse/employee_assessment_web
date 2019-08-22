import { Injectable } from '@angular/core';
import { ResponseData } from '../models/ResponseData';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeEvaluation } from '../models/EmployeeEvaluation';
import { EvaluationParameter } from '../models/EvaluationParameter';
import { EvaluationCriteria } from '../models/EvaluationCriteria';
import { Department } from '../models/Department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationCriteriaService {
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/evaluation_criteria";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;

  responseData: ResponseData = JSON.parse(localStorage.getItem('responseJson'));
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

getEvaluationCriteria(departmentId: number): Observable<ResponseData> {
  this.params = "/" + departmentId;
  return this.http.get<ResponseData>(this.baseURL + this.params);
}

createEvaluationCriteria(evaluationCriteria){
  return this.http.post(this.baseURL, evaluationCriteria);
}
 
updateEmployeeStatus(department: Department): Observable<ResponseData>{
  this.method = "/update_evaluation_status";
  return this.http.post<ResponseData>(this.baseURL + this.method, department);
}

addEmployeeEvaluation(evaluatedList: EmployeeEvaluation[]) {
  return this.http.post(this.baseURL + '/employee_evaluation', evaluatedList).pipe(
    map((response: any) => {
      const user: any = response;
      this.responseData = response;
      this.router.navigate(['/evaluate_employee']);
      console.log(user);
    })
  );
}


getEvaluationParameters(): Observable<ResponseData> {
  return this.http.get<ResponseData>(this.baseURL + '/evaluationParameter' );
}

addEvaluationParameter(evaluationParameter: EvaluationParameter) {
  return this.http.post(this.baseURL + '/evaluationParameter', evaluationParameter).pipe(
    map((response: any) => {
      const user: any = response;
      this.responseData = response;
      this.router.navigate(['/evaluation_criteria', this.responseData.data.login.employee.department.departmentId]);
      console.log(user);
    })
  );
}

addEvaluationCriteria(evaluationCriteria: EvaluationCriteria) {
  return this.http.post(this.baseURL + '/evaluation_criteria', evaluationCriteria).pipe(
    map((response: any) => {
      const user: any = response;
      this.responseData = response;
      this.router.navigate(['/evaluation_criteria', this.responseData.data.login.employee.department.departmentId]);
      console.log(user);
    })
  );
}

}
