import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/login";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;
  
  constructor(private http: HttpClient) { }
  
  registerlogin(login: Login): Observable<ResponseData>{
    
    return this.http.post<ResponseData>(this.baseURL, login);
    }
  
  getlogin(id: number): Observable<ResponseData>{
  
    this.params = "/" + id;
    return this.http.get<ResponseData>(this.baseURL + this.params);
    }
  
  getloginList(): Observable<ResponseData>{
  
  return this.http.get<ResponseData>(this.baseURL);
  }

}
