import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from '../models/ResponseData';
import { LoginService } from '../services/login.service';

@Injectable()

export class LoginListResolver implements Resolve<ResponseData> {

    constructor(private loginService: LoginService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResponseData> {
        return this.loginService.getloginList().pipe(
            catchError (error => {
                console.log('Probem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}