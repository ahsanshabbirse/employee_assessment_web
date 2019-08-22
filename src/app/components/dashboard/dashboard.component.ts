import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Department } from 'src/app/models/Department';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { ResponseData } from 'src/app/models/ResponseData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
department: Department;
responseData: ResponseData;

  constructor(private utils: UtilsService, private route: ActivatedRoute) { 
    this.department = this.utils.getDepartment();
  }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.responseData = data.dashboardData;
    });
  }

}
