import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Login } from '../models/Login';

@Injectable({
  providedIn: "root"
})
export class ManagerX4Guard implements CanActivate {
  login: Login;
  constructor(private router: Router){}
  canActivate(): boolean {
    if(localStorage.getItem('loginInfo')){
      const loginInfo = localStorage.getItem('loginInfo');
      this.login = JSON.parse(loginInfo);
      if(this.login.employee.level == 4){
        return true;
      }
    }
    console.log("ManagerX3 Guard: Your Designation Level does not allow the attempted action");
    this.router.navigate(['/home']);
    return false;
  }
}
