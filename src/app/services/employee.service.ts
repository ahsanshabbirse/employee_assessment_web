import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseData } from '../models/ResponseData';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { AlertifyService } from './alertify.service';
import { EmployeePersonalDetails } from '../models/EmployeePersonalDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/employee";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;
  
  constructor(private http: HttpClient, private alertify: AlertifyService) { }
  
  registerEmployee(employee: Employee): Observable<ResponseData>{
    
    return this.http.post<ResponseData>(this.baseURL, employee);
    }
  
  getEmployee(id: number): Observable<ResponseData>{
  
    this.params = "/" + id;
    return this.http.get<ResponseData>(this.baseURL + this.params);
    }
  
  getEmployeeList(): Observable<ResponseData>{
  
  return this.http.get<ResponseData>(this.baseURL);
  }

  updateProfile(id: number, employeePersonalDetail: EmployeePersonalDetails): Observable<ResponseData> {
  return this.http.put<ResponseData>(this.restServiceURL + '/employee_personal_details/' + id, employeePersonalDetail);
 }

}
