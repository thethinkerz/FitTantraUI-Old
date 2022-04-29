import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  }),

  params: {}
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(private http: HttpClient) { }

  GetLogin(UserEmail: string, UserPassword: string)
  {
    this.apiUrl = environment.apiUrl + 'User';
    httpOptions.params = {UserEmail: UserEmail, UserPassword: UserPassword} 
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}
