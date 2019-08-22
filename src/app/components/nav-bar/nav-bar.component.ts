import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseData } from 'src/app/models/ResponseData';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private login: Login;
  private responseData: ResponseData;

  loginCredentials: Login;
  isLoggedIn = false;
  managerX4LoggedIn = false;
  managerX3LoggedIn = false;
  teamMemberLoggedIn = false;

  constructor(private alertify: AlertifyService, public authService: AuthService, private router: Router, private utilsService: UtilsService) {
    this.loginCredentials = new Login();
  }

  ngOnInit() {
    this.loggedIn();
  }

  authenticate() {
    this.authService.authenticateUser(this.loginCredentials).subscribe(
      (responseData: ResponseData) => {
        this.responseData = responseData;
        if (this.responseData.data.login) {
          localStorage.setItem(
            'loginInfo',
            JSON.stringify(this.responseData.data.login)
          );
          this.alertify.sucess('Logged in successfully');
          this.loggedIn();
          if(this.teamMemberLoggedIn){
            this.utilsService.provideEmployeeData(this.responseData.data.login.employee);
            this.router.navigate(['/employee-details']);
          }
          else{
            this.router.navigate(['/dashboard']);
          }
        }
      },
      error => {
        this.authService.loggedIn = false;
        console.log(error);
      },
      () => {
        if (this.responseData) {
          this.isLoggedIn = this.authService.loggedIn;
        }
      }
    );
  }

  private loggedIn() {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      this.isLoggedIn = this.authService.loggedIn = true;
      this.login = JSON.parse(loginInfo);
      if (this.login.employee.designation === 2) {
        if (this.login.employee.level === 3) {
          this.managerX3LoggedIn = true;
        }else if (this.login.employee.level === 4){
          this.managerX4LoggedIn = true;
        }
      } else if (this.login.employee.designation === 1) {
        this.teamMemberLoggedIn = true;
      }
    }
  }

  logOut() {
    localStorage.removeItem('loginInfo');
    this.isLoggedIn = this.authService.loggedIn = false;
    this.managerX4LoggedIn = false;
    this.managerX3LoggedIn = false;
    this.teamMemberLoggedIn = false;
    this.router.navigate(['/home']);
    this.alertify.message('Logged out successfully');
  }
}
