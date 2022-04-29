import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pattern } from '@app/Model/pattern'

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  }),

  params: {}
};

@Injectable({
  providedIn: 'root'
})

export class GrouppatternService {

  apiUrl: string;

  constructor(private http: HttpClient) { }

  GetGroupPattern(groupId: number, isActive: any)
  {
    this.apiUrl = environment.apiUrl + 'PatternGroup';
    httpOptions.params = {groupId: groupId, isActive: isActive} 
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}
