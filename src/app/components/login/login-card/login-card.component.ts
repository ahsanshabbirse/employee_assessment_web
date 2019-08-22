import { Component, OnInit, Input } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { UtilsService } from 'src/app/services/utils.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {
  @Input() login: Login;
  picture: SafeUrl;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.picture = this.utilsService.getSantizeUrl(this.login.employee.employeePersonalDetails.picture);
  }

}
