import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/models/ResponseData';

@Component({
  selector: 'app-department-register-form',
  templateUrl: './department-register-form.component.html',
  styleUrls: ['./department-register-form.component.css']
})
export class DepartmentRegisterFormComponent implements OnInit {
  departmemntForm: FormGroup;
  department: Department;
  responseData: ResponseData;

  constructor(private departmentSrvice: DepartmentService, private formBuilder: FormBuilder, private router: Router) {
    this.department = new Department();
  }
 
  ngOnInit() {

    this.validateDepartemntForm();

  }

  validateDepartemntForm() {
    this.departmemntForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(24), Validators.pattern('^[a-zA-Z\\s]*$')]],
    });
  }


  registerDepartment() {
    if (this.departmemntForm.valid) {
      this.department.name = this.departmemntForm.get('name').value;
      
      this.departmentSrvice.registerDepartment(this.department).subscribe(data => {
        this.responseData = data;
        console.log(this.responseData.responseMessage);
        this.router.navigateByUrl('/department');
      }, error => {
        console.log(error);
      });
    }
  }
}
