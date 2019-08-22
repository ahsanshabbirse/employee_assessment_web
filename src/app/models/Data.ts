import { Login } from './Login';
import { Employee } from './Employee';
import { Department } from './Department';
import { EvaluationParameter } from './EvaluationParameter';
import { EvaluationCriteria } from './EvaluationCriteria';
import { EmployeeEvaluation } from './EmployeeEvaluation';
import { EmployeePersonalDetails } from './EmployeePersonalDetails';

export class Data {
    login: Login;
    loginList: Login[];

    employee: Employee;
    employeeList: Employee[];

    department: Department;
    departmentList: Department[];

    evaluationParameter: EvaluationParameter;
    evaluationParameterList: EvaluationParameter[];

    evaluationCriteria: EvaluationCriteria;
    evaluationCriteriaList: EvaluationCriteria[];

    employeeEvaluation: EmployeeEvaluation;
    employeeEvaluationList: EmployeeEvaluation[];

    employeePersonalDetails: EmployeePersonalDetails;

}