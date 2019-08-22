import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Login } from 'src/app/models/Login';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ResponseData } from 'src/app/models/ResponseData';
import { Router } from '@angular/router';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  uploader: FileUploader ;
  hasBaseDropZoneOver = false;
  private restServiceURL: string = environment.REST_SERVICE_URL;
  private requestedURL = '/employee';
  responseBean: Login = JSON.parse(localStorage.getItem('loginInfo'));
  constructor(public alertify: AlertifyService,  private router: Router, public employeeEdit: EmployeeEditComponent) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
 
 initializeUploader()
 {
   this.uploader = new FileUploader({
     url: 'http://localhost:8080/employee_personal_details/upload_image/' + 
     this.responseBean.employee.employeePersonalDetails.employeePersonalDetailsId,
     isHTML5: true,
     allowedFileType: ['image'],
     removeAfterUpload: true,
     autoUpload: false,
     maxFileSize: 60000
   });
   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
   this.uploader.onErrorItem = (item, response, status, headers) => {
    if (response) {

      console.log(response);
      this.alertify.error('Picture Upload Failed');
    }
   };
   this.uploader.onSuccessItem = (item, response, status, headers) => {
     if(response) {
       const responseBean: ResponseData = JSON.parse( response);

       console.log(response);
       this.alertify.sucess('Picture Upload Sucessfully');
       this.responseBean.employee.employeePersonalDetails = responseBean.data.employeePersonalDetails;
       localStorage.setItem(
        'loginInfo',
        JSON.stringify(this.responseBean)
      );
       this.employeeEdit.ngOnInit();
     }
   };
 }
}
