import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from '../models/ResponseData';
import { EmployeeService } from '../services/employee.service';

@Injectable()

export class EmployeeResolver implements Resolve<ResponseData> {

    constructor(private employeeService: EmployeeService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        return this.employeeService.getEmployee(route.params.id).pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}