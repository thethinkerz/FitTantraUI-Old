import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '@app/Service/User/user.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserManager {
    constructor( private oUserService: UserService){

    }

    GetLogin(UserEmail: string, UserPassword: string): Observable<any>{
        return this.oUserService.GetLogin(UserEmail, UserPassword).pipe(map((response: any) => response));
    }

}