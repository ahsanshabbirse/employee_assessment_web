import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Login } from "../models/Login";

@Injectable({
  providedIn: "root"
})
export class ManagerX3Guard implements CanActivate {
  login: Login;
  constructor(private router: Router) {}
  canActivate(): boolean {
    const loginInfo = localStorage.getItem("loginInfo");
    this.login = JSON.parse(loginInfo);
    if (this.login.employee.level <= 3) {
      return true;
    }
    console.log("ManagerX3 Guard: Your Designation Level does not allow the attempted action");
    this.router.navigate(["/home"]);
    return false;
  }
}
