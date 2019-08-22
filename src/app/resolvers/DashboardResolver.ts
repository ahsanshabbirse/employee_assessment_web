import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from '../models/ResponseData';
import { EmployeeService } from '../services/employee.service';
import { DashboardService } from '../services/dashboard.service';
import { UtilsService } from '../services/utils.service';

@Injectable()

export class DashboardResolver implements Resolve<ResponseData> {

    constructor(private dashboardService: DashboardService, private utilsService: UtilsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        return this.dashboardService.getEmployeeList(this.utilsService.getEmployee()).pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}