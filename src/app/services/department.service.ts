import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../models/ResponseData';
import { Observable } from 'rxjs';
import { Department } from '../models/Department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

private restServiceURL: string = environment.REST_SERVICE_URL;
private requestedURL: string = "/department";
private method: string;
private params: string;
private baseURL: string = this.restServiceURL + this.requestedURL;

constructor(private http:HttpClient) { }

registerDepartment(department: Department): Observable<ResponseData>{
  
  return this.http.post<ResponseData>(this.baseURL, department);
  }

getDepartment(id: number): Observable<ResponseData>{

  this.params = "/" + id;
  return this.http.get<ResponseData>(this.baseURL + this.params);
  }

getDepartmentList(): Observable<ResponseData>{

return this.http.get<ResponseData>(this.baseURL);
}
}
