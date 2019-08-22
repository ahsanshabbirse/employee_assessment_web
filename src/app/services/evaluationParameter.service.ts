import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';
import { EvaluationParameter } from '../models/EvaluationParameter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationParameterService {
  
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/evaluation_parameter";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;
  
  constructor(private http: HttpClient) { }
  
  registerEvaluationParameter(parameter: EvaluationParameter): Observable<ResponseData>{
    
    return this.http.post<ResponseData>(this.baseURL, parameter);
    }
  
  getEvaluationParameter(id: number): Observable<ResponseData>{
  
    this.params = "/" + id;
    return this.http.get<ResponseData>(this.baseURL + this.params);
    }
  
  getEvaluationParameterList(): Observable<ResponseData>{
    
  return this.http.get<ResponseData>(this.baseURL);
  }
}
