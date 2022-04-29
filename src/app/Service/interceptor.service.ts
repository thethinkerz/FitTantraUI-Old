import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '@app/Service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private tokenStorageService: TokenStorageService) { }

  authToken: string | null;
  sessionId: string | null;
  userID: number;
  user: any;

 handleError(error: HttpErrorResponse) {
     console.log(error);
     
     //////console.log(this.errorService.isLoading);
    // this.errorService.isLoading.next(true);
     return throwError(error);
 }

 intercept(req: HttpRequest<any>, next: HttpHandler):
 
     Observable<HttpEvent<any>> {
       debugger
       let contentType;
       if (req.headers.has('Content-Type')){
         contentType = req.headers.get('Content-Type');
         console.log(contentType);
       }
     
    
      // this.errorService.isLoading.next(true);
      this.authToken = this.tokenStorageService.getToken();
      this.sessionId = this.tokenStorageService.getSessionId();
      this.user = this.tokenStorageService.getUser();
     //  alert(this.authToken)
      if(this.authToken == null){
        this.authToken = '';
      }
      if(this.sessionId == null){
        this.sessionId = '';
      }
      if(this.user == null){
       this.userID = 0;
     }
     else{
       this.userID = this.user.Id;
     }
     if(contentType == null){
       const authReq = req.clone({
         headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Token': this.authToken,
           'SessionID': this.sessionId,
           'UserID': this.userID.toString()
         })
       });
       console.log(authReq);
       return next.handle(authReq)
       .pipe(
       
           catchError(this.handleError)
       )
     }
     else{
       const authReq = req.clone({
         headers: new HttpHeaders({
           
           'Token': this.authToken,
           'SessionID': this.sessionId,
           'UserID': this.userID.toString()
         })
       });
       console.log(authReq);
       return next.handle(authReq)
       .pipe(
       
           catchError(this.handleError)
       )
     }
         
         
 };
}
