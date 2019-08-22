import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';
import { Employee } from '../models/Employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/employee";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;
  
  constructor(private http: HttpClient) { }

  getEmployeeList(employee: Employee): Observable<ResponseData>{
  this.method = "/get_managers";
  this.params = "?departmentId=" + employee.department.departmentId + "&level=" + employee.level;
  console.log(this.baseURL + this.method + this.params);
  return this.http.get<ResponseData>(this.baseURL + this.method + this.params);
  }

}
