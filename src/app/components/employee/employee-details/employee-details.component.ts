import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "src/app/models/Employee";
import { UtilsService } from 'src/app/services/utils.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
  // responseData: ResponseData;
  employee: Employee;
  designation: string;
  exEmployee: string;
  picture: SafeUrl;

  constructor(public domSanitizationService: DomSanitizer,
              private route: ActivatedRoute, private utilsService: UtilsService, private router: Router, private utils: UtilsService) {}

  ngOnInit() {
    this.employee = this.utilsService.getEmployeeDetails();

    if (this.employee.designation === 1) {
      this.designation = 'Team Member';
    } else if (this.employee.designation === 2) {
      this.designation = 'Manager';
    }

    if (this.employee.exEmployee) {
      this.exEmployee = 'Former Employeed';
    } else {
      this.exEmployee = 'Current Employee';
    }

    this.picture = this.utils.getSantizeUrl(this.employee.employeePersonalDetails.picture);
  }

  getEmployeeDetails() {
    // this.route.data.subscribe(data => {
    //   this.responseData = data.employee;
    // });
  }
}
