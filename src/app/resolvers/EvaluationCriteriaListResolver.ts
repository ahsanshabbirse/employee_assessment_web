import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from '../models/ResponseData';
import { EvaluationCriteriaService } from '../services/evaluationCriteria.service';

@Injectable()

export class EvaluationCriteriaListResolver implements Resolve<ResponseData> {

    constructor(private evaluationCriteriaService: EvaluationCriteriaService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        console.log("Evaluation Criteria List Resolver");
        return this.evaluationCriteriaService.getEvaluationCriteria(1).pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}