import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentService } from '../services/department.service';
import { ResponseData } from '../models/ResponseData';

@Injectable()

export class DepartmentListResolver implements Resolve<ResponseData> {

    constructor(private departmentService: DepartmentService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        return this.departmentService.getDepartmentList().pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}