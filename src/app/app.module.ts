import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  BsDropdownModule,
  TabsModule,
  BsModalService,
  ModalModule
} from "ngx-bootstrap";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { appRoutes } from "./routes";

import { NavBarComponent } from "../app/components/nav-bar/nav-bar.component";
import { LoginComponent } from "../app/components/login/login.component";
import { LoginCardComponent } from "../app/components/login/login-card/login-card.component";
import { LoginRegisterComponent } from "../app/components/login/login-register/login-register.component";
import { LoginRegisterFormComponent } from "../app/components/login/login-register/login-register-form/login-register-form.component";
import { HomeComponent } from "../app/components/home/home.component";
import { EvaluationCriteriaComponent } from "../app/components/evaluation-criteria/evaluation-criteria.component";
import { EvaluationCriteriaRegisterFormComponent } from "./components/evaluation-criteria/evaluation-criteria-register-form/evaluation-criteria-register-form.component";
import { EvalutionCriteriaParameterFormComponent } from "./components/evaluation-criteria/evalution-criteria-parameter-form/evalution-criteria-parameter-form.component";
import { EmployeeComponent } from "../app/components/employee/employee.component";
import { EmployeeCardComponent } from "../app/components/employee/employee-card/employee-card.component";
import { EmployeeDetailsComponent } from "../app/components/employee/employee-details/employee-details.component";
import { EmployeeRegisterComponent } from "../app/components/employee/employee-register/employee-register.component";
import { EmployeeRegisterFormComponent } from "../app/components/employee/employee-register/employee-register-form/employee-register-form.component";
import { DepartmentComponent } from "../app/components/department/department.component";
import { DepartmentCardComponent } from "../app/components/department/department-card/department-card.component";
import { DepartmentRegisterComponent } from "../app/components/department/department-register/department-register.component";
import { DepartmentRegisterFormComponent } from "../app/components/department/department-register/department-register-form/department-register-form.component";
import { DashboardComponent } from "../app/components/dashboard/dashboard.component";
import { ConfirmationModalComponent } from "../app/components/confirmation-modal/confirmation-modal.component";

import { LoginService } from "./services/login.service";
import { AuthService } from "./services/auth.service";
import { DepartmentService } from "./services/department.service";
import { EmployeeService } from "./services/employee.service";
import { EvaluationCriteriaService } from "./services/evaluationCriteria.service";
import { EvaluationParameterService } from "./services/evaluationParameter.service";
import { DepartmentListResolver } from "./resolvers/DepartmentListResolver";
import { EmployeeListResolver } from "./resolvers/EmployeeListResolver";
import { LoginListResolver } from "./resolvers/LoginListResolver";
import { EvaluationParameterListResolver } from "./resolvers/EvaluationParameterListResolver";
import { EmployeeResolver } from "./resolvers/EmployeeResolver";
import { AuthGuard } from "./guards/auth.guard";
import { EmployeeEvaluationService } from "./services/employeeEvaluation.service";
import { ManagerX4Guard } from "./guards/managerX4.guard";
import { ManagerX3Guard } from "./guards/managerX3.guard";
import { EvaluationCriteriaListResolver } from "./resolvers/EvaluationCriteriaListResolver";
import { ChartsModule } from "ng2-charts";
import { DashboardChartComponent } from "./components/dashboard/dashboard-chart/dashboard-chart.component";
import { DashboardResolver } from "./resolvers/DashboardResolver";
import { DashboardCardComponent } from "./components/dashboard/dashboard-card/dashboard-card.component";
import { DashboardService } from "./services/dashboard.service";
import { EmployeeCardModalComponent } from "./components/employee/employee-card/employee-card-modal/employee-card-modal.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeEvaluateComponent } from "./components/employee/employee-evaluate/employee-evaluate.component";
import { EmployeeEvaluateModalComponent } from "./components/employee/employee-evaluate/employee-evaluate-modal/employee-evaluate-modal.component";
import { EmployeeCardModalReEvaluateModalComponent } from "./components/employee/employee-card/employee-card-modal/employee-card-modal-re-evaluate-modal/employee-card-modal-re-evaluate-modal.component";
import { EmployeeEvaluateEvaluationNotStartedModalComponent } from "./components/employee/employee-evaluate/employee-evaluate-evaluation-not-started-modal/employee-evaluate-evaluation-not-started-modal.component";
import { EvaluationCriteriaModifyModalComponent } from './components/evaluation-criteria/evaluation-criteria-modify-modal/evaluation-criteria-modify-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { AlertifyService } from './services/alertify.service';
import { PhotoEditorComponent } from './components/employee/photo-editor/photo-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    LoginCardComponent,
    LoginRegisterComponent,
    LoginRegisterFormComponent,
    HomeComponent,
    EvaluationCriteriaComponent,
    EvaluationCriteriaModifyModalComponent,
    EvaluationCriteriaRegisterFormComponent,
    EvalutionCriteriaParameterFormComponent,
    EmployeeComponent,
    EmployeeCardComponent,
    EmployeeCardModalComponent,
    EmployeeCardModalReEvaluateModalComponent,
    EmployeeDetailsComponent,
    EmployeeEvaluateComponent,
    EmployeeEvaluateModalComponent,
    EmployeeEvaluateEvaluationNotStartedModalComponent,
    EmployeeRegisterComponent,
    EmployeeRegisterFormComponent,
    DepartmentComponent,
    DepartmentCardComponent,
    DepartmentRegisterComponent,
    DepartmentRegisterFormComponent,
    DashboardComponent,
    DashboardCardComponent,
    DashboardChartComponent,
    ConfirmationModalComponent,
    EmployeeEditComponent,
    PhotoEditorComponent
  ],
  entryComponents: [
    EvaluationCriteriaModifyModalComponent,
    EmployeeCardModalComponent,
    EmployeeCardModalReEvaluateModalComponent,
    EmployeeEvaluateEvaluationNotStartedModalComponent,
    EmployeeEvaluateModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    ChartsModule,
    NgbModule,
    FileUploadModule,
    ModalModule
  ],
  providers: [
    LoginService,
    AuthService,
    AuthGuard,
    ManagerX4Guard,
    ManagerX3Guard,
    DepartmentService,
    EmployeeService,
    EmployeeEvaluationService,
    EvaluationCriteriaService,
    EvaluationParameterService,
    DashboardService,
    EmployeeResolver,
    EmployeeListResolver,
    DepartmentListResolver,
    LoginListResolver,
    EvaluationParameterListResolver,
    EvaluationCriteriaListResolver,
    DashboardResolver,
    AlertifyService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
