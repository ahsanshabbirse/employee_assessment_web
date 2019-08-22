import { Employee } from './Employee';
import { EvaluationCriteria } from './EvaluationCriteria';

export class EmployeeEvaluation {
    employeeEvaluationId: number;
    employee: Employee;
    evaluationParameterName: string;
    selfRatedValue: number;
    managerRatedValue: number;
    selfProvidedComments: string;
    managerProvidedComments: string;
    evaluatedBy: number;
    evaluationParameterCategory: number;

}