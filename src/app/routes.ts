import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginRegisterComponent } from "./components/login/login-register/login-register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DepartmentComponent } from "./components/department/department.component";
import { DepartmentRegisterComponent } from "./components/department/department-register/department-register.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { EmployeeRegisterComponent } from "./components/employee/employee-register/employee-register.component";
import { EmployeeDetailsComponent } from "./components/employee/employee-details/employee-details.component";
import { EvaluationCriteriaComponent } from "./components/evaluation-criteria/evaluation-criteria.component";

import { DepartmentListResolver } from "./resolvers/DepartmentListResolver";
import { EmployeeListResolver } from "./resolvers/EmployeeListResolver";
import { LoginListResolver } from "./resolvers/LoginListResolver";
import { EvaluationParameterListResolver } from "./resolvers/EvaluationParameterListResolver";
import { EmployeeResolver } from "./resolvers/EmployeeResolver";
import { AuthGuard } from "./guards/auth.guard";
import { ManagerX4Guard } from "./guards/managerX4.guard";
import { ManagerX3Guard } from "./guards/managerX3.guard";
import { EvaluationCriteriaListResolver } from "./resolvers/EvaluationCriteriaListResolver";
import { DashboardResolver } from "./resolvers/DashboardResolver";
import { EmployeeEvaluateComponent } from './components/employee/employee-evaluate/employee-evaluate.component';

import { EmployeeEditComponent } from "./components/employee/employee-edit/employee-edit.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        canActivate: [ManagerX3Guard],
        children: [
          {
            path: "employee",
            component: EmployeeComponent,
            resolve: { employeeList: EmployeeListResolver }
          },
          // {
          //   path: "employee-details/:id",
          //   component: EmployeeDetailsComponent,
          //   resolve: { employee: EmployeeResolver }
          // },
          {
            path: "employee-details",
            component: EmployeeDetailsComponent
          },
          {
            path: "employee-evaluate",
            component: EmployeeEvaluateComponent
          },
          {
            path: "employee-register",
            component: EmployeeRegisterComponent,
            resolve: { departmentList: DepartmentListResolver }
          }
        ]
      },
      {
        path: "",
        canActivate: [ManagerX4Guard],
        children: [
          {
            path: "department",
            component: DepartmentComponent,
            resolve: { departmentList: DepartmentListResolver }
          }
        ]
      },
      {
        path: "evaluate_employee/edit",
        component: EmployeeEditComponent,
      },
      {
        path: "login",
        component: LoginComponent,
        resolve: { loginList: LoginListResolver }
      },
      {
        path: "login-register",
        component: LoginRegisterComponent,
        resolve: { employeeList: EmployeeListResolver }
      },
      {
        path: "evaluation-criteria",
        component: EvaluationCriteriaComponent,
        resolve: { evaluationParameterList: EvaluationParameterListResolver }
        // resolve: { evaluationParameterList: EvaluationParameterListResolver, evaluationCriteriaList: EvaluationCriteriaListResolver }
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        resolve: { dashboardData: DashboardResolver }
      },
      { path: "department-register", component: DepartmentRegisterComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
