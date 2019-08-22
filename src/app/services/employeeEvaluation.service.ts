import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EmployeeEvaluation } from '../models/EmployeeEvaluation';
import { ResponseData } from '../models/ResponseData';
import { Employee } from '../models/Employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEvaluationService {
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/evaluation_criteria";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;


  responseData: ResponseData;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

getEvaluationCriteria(departmentId): Observable<ResponseData> {
  this.params = "/" + departmentId;
  return this.http.get<ResponseData>(this.baseURL +  this.params);
}

updateEmployeeStatus(employee: Employee){
  return this.http.put(this.restServiceURL + '/employee', employee );
}

getEvaluationPerformedByEmployee(employeeId: number, evaluationStartTimeStamp){
  this.params = "?evaluationStartDate=" + evaluationStartTimeStamp + "&employeeId=" + employeeId;
  return this.http.get(this.restServiceURL + '/employee_evaluation/get_employee_evaluation' + this.params);
}
 
addEmployeeEvaluation(evaluatedList: EmployeeEvaluation[]) {
  return this.http.post(this.restServiceURL + '/employee_evaluation', evaluatedList);
}


}
