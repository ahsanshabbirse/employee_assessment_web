import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/Department';
import { Employee } from 'src/app/models/Employee';
import { EmployeePersonalDetails } from 'src/app/models/EmployeePersonalDetails';
import { Login } from 'src/app/models/Login';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';
import { ResponseData } from 'src/app/models/ResponseData';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @ViewChild('editForm', { static: true }) editForm: NgForm;
  departmentBean: Department;
  employee: Employee;
  url: any = {};
  employeePersonalDetail: EmployeePersonalDetails;
  loginDetail: Login;
  checked: boolean;
  responseData: ResponseData;
  sessionBean: Login;
  designation: string;
  exEmployee: string;


  constructor(public domSanitizationService: DomSanitizer, private alertify: AlertifyService, private route: ActivatedRoute,
              private employeeService: EmployeeService) {
  }
  ngOnInit() {
    this.sessionBean = JSON.parse(localStorage.getItem('loginInfo'));
    this.employeePersonalDetail = this.sessionBean.employee.employeePersonalDetails;

    if (this.sessionBean.employee.designation === 1) {
      this.designation = 'Team Member';
    } else if (this.sessionBean.employee.designation === 2) {
      this.designation = 'Manager';
    }

    if (this.sessionBean.employee.exEmployee) {
      this.exEmployee = 'True';
    } else {
      this.exEmployee = 'False';
    }
  }

  public getSantizeUrl() {
    return this.domSanitizationService.bypassSecurityTrustUrl('data:image/jpg;base64,'
      + this.employeePersonalDetail.picture);
  }

  updateUser() {
    this.employeeService.updateProfile(this.employeePersonalDetail.employeePersonalDetailsId, this.employeePersonalDetail).subscribe(
      responseData => {
        this.responseData = responseData;
        this.sessionBean.employee.employeePersonalDetails = this.responseData.data.employeePersonalDetails;
        localStorage.setItem(
          'loginInfo',
          JSON.stringify(this.sessionBean)
        );
        console.log(this.responseData);
        this.alertify.sucess(this.responseData.responseMessage);
      },
      error => {
        console.log(error);
        this.alertify.sucess(error);
      }
    );
    this.editForm.reset(this.employeePersonalDetail);
  }



}
