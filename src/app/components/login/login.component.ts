import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/models/ResponseData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responseData: ResponseData;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getLoginList();
  }

  getLoginList(){
  this.route.data.subscribe(data =>{
    this.responseData = data['loginList'];
  },error=>{
    console.log(error);
  });
}

}
