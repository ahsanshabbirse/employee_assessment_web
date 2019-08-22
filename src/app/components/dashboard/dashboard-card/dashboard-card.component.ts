import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
@Input() employee: Employee;
picture: SafeUrl;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.picture = this.utilsService.getSantizeUrl(this.employee.employeePersonalDetails.picture);
  }

  setEmployeeDetails(){
    this.utilsService.provideEmployeeData(this.employee);
  }

  getEmployeeDesignation(value: number){
    return this.utilsService.getEmployeeDesignation(value);
  }

  getEmployeeLevel(value: number){
    return this.utilsService.getEmployeeLevel(value);
  }

}
