import { Injectable } from "@angular/core";
import { Login } from "../models/Login";
import { BehaviorSubject } from "rxjs";
import { Employee } from "../models/Employee";
import { Router } from "@angular/router";
import { Department } from "../models/Department";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  private interfaceURL = environment.INTERFACE_URL;
  private interfaceURLAssets = this.interfaceURL + "/" + environment.INTERFACE_URL_ASSETS;
  private login: Login;
  value: string;

  private currentEmployee = new BehaviorSubject<Employee>(new Employee());
  employeeData = this.currentEmployee.asObservable();
  employeeObserved: Employee;

  constructor(
    private router: Router,
    public domSanitizationService: DomSanitizer
  ) {
    this.getLoggedInDetails();
  }

  getLoggedInDetails(): Login {
    const loginInfo = localStorage.getItem("loginInfo");
    return (this.login = JSON.parse(loginInfo));
  }

  setLoggedInDepartmentDetails(department: Department) {
    this.login.employee.department = department;
    localStorage.setItem("loginInfo", JSON.stringify(this.login));
  }

  getDepartment() {
    this.getLoggedInDetails();
    return this.login.employee.department;
  }

  getEmployee() {
    this.getLoggedInDetails();
    return this.login.employee;
  }

  getEvaluationCategory(value: number): string {
    this.value = "Core";
    if (value === 2) {
      this.value = "Soft Skills";
    } else if (value === 3) {
      this.value = "Additional";
    }
    return this.value;
  }

  getEmployeeDesignation(value: number): string {
    this.value = "Team Member";
    if (value === 2) {
      this.value = "Manager";
    }
    return this.value;
  }

  getEmployeeLevel(value: number): string {
    this.value = "2.0";
    if (value === 2) {
      this.value = "2.1";
    } else if (value === 3) {
      this.value = "X3";
    } else if (value === 4) {
      this.value = "X4";
    }
    return this.value;
  }

  getEmployeeRatting(value: number) {
    this.value = "N/A";
    if (value === 1) {
      this.value = "Below Average";
    } else if (value === 2) {
      this.value = "Average";
    } else if (value === 3) {
      this.value = "Meet Expectations";
    } else if (value === 4) {
      this.value = "Very Good";
    } else if (value === 5) {
      this.value = "Exceptional";
    }
    return this.value;
  }

  provideEmployeeData(employee: Employee) {
    this.currentEmployee.next(employee);
  }

  getEmployeeDetails() {
    this.employeeData.subscribe(data => {
      this.employeeObserved = data;
      if (!this.employeeObserved.employeeId) {
        this.employeeObserved = this.getEmployee();
        if (this.employeeObserved.level >= 3) {
          this.router.navigateByUrl("/employee");
        }
      }
    });
    return this.employeeObserved;
  }

  getModalDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `${reason}`;
    }
  }

  public getSantizeUrl(picture: string): SafeUrl {
    if (!picture) {
      return this.interfaceURLAssets + "/user.png";
    }
    return this.domSanitizationService.bypassSecurityTrustUrl(
      "data:image/jpg;base64," + picture
    );
  }
}
