import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EvaluationParameterService } from '../services/evaluationParameter.service';
import { ResponseData } from '../models/ResponseData';

@Injectable()

export class EvaluationParameterListResolver implements Resolve<ResponseData> {

    constructor(private evaluationParameterService: EvaluationParameterService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        return this.evaluationParameterService.getEvaluationParameterList().pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}