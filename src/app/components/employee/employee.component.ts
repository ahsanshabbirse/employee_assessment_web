import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/models/ResponseData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  responseData: ResponseData;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEmployeeList();
  }

getEmployeeList(){
  this.route.data.subscribe(data =>{
    this.responseData = data['employeeList'];
  },error=>{
    console.log(error);
  });
}

}
