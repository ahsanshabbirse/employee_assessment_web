import { Department } from './Department';
import { EmployeePersonalDetails } from './EmployeePersonalDetails';

export class Employee {
    employeeId: number;
    department: Department;
    employeePersonalDetails: EmployeePersonalDetails;
    designation: number;
    level: number;
    officeEmail: string;
    officeContact: string;
    exEmployee: boolean;
    evaluationStatus: number;
    createdTimestamp: string;
}