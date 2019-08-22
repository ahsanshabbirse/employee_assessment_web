import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/models/ResponseData';
import { DepartmentService } from 'src/app/services/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  responseData: ResponseData;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDepartmentList();
  }

getDepartmentList(){
  this.route.data.subscribe(data =>{
    this.responseData = data['departmentList'];
  },error=>{
    console.log(error);
  });
}

}
