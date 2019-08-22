import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Employee } from "src/app/models/Employee";
import { Department } from "src/app/models/Department";
import { ResponseData } from "src/app/models/ResponseData";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeePersonalDetails } from "src/app/models/EmployeePersonalDetails";
import { Login } from 'src/app/models/Login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: "app-login-register-form",
  templateUrl: "./login-register-form.component.html",
  styleUrls: ["./login-register-form.component.css"]
})
export class LoginRegisterFormComponent implements OnInit {
  loginRegisterForm: FormGroup;
  login: Login;
  employees: Employee[];
  responseData: ResponseData;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.login = new Login();
    this.login.employee = new Employee();
    this.login.employee.employeePersonalDetails = new EmployeePersonalDetails();
    this.login.employee.department = new Department();
  }

  ngOnInit() {
    this.getEmployeesList();
    this.validateLoginForm();
  }

  private getEmployeesList() {
    this.route.data.subscribe(
      data => {
        this.responseData = data.employeeList;
        this.employees = this.responseData.data.employeeList;
        console.log(this.employees);
      },
      error => {
        console.log(error);
      }
    );
  }

  validateLoginForm() {
    this.loginRegisterForm = this.formBuilder.group({
      employee: ["0", Validators.required],
      userName: ['', [Validators.required, Validators.maxLength(44)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(formvalue: FormGroup) {
    return formvalue.get('password').value === formvalue.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  registerLogin() {
    if (this.loginRegisterForm.valid) {
      this.login.userName = this.loginRegisterForm.get('userName').value;
      this.login.password = this.loginRegisterForm.get('password').value;
      this.login.employee.employeeId = this.loginRegisterForm.get('employee').value;

      this.loginService.registerlogin(this.login).subscribe(
        responseData => {
          this.responseData = responseData;
          console.log(this.responseData.responseMessage);
        },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigateByUrl("/login");
        }
      );
    }
    console.log(this.login);
  }
}
