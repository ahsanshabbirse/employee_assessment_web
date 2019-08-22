import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '../models/Login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL: string = "/login";
  private method: string;
  private params: string;
  private baseURL: string = this.restServiceURL + this.requestedURL;
  userName: any;
  loggedIn = false;

  constructor(private router: Router, private http: HttpClient) {}

  authenticateUser(login: Login){
    this.params = "/authenticate";
    return this.http.post(this.baseURL + this.params, login);
  }

  private authenticated() {
    this.loggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  loggedOut(){
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }
}
