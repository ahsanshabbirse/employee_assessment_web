import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Login } from './models/Login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-assessment-web';
  constructor(private authService: AuthService){}

  responseBean: Login = JSON.parse(localStorage.getItem('loginInfo'));
  ngOnInit() {
  
    
    if (this.responseBean) {
    this.authService.userName = this.responseBean.employee.employeePersonalDetails.firstName;
  }
  
  }
  
  }