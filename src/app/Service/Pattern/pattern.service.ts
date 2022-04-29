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

export class PatternService {

  apiUrl: string;

  constructor(private http: HttpClient) { }

  CheckRegxPattern(patternText: string, textValidate: string)
  {
    this.apiUrl = environment.apiUrl + 'Pattern';
    httpOptions.params = {patternText: patternText, textValidate: textValidate} 
    return this.http.get<any>(this.apiUrl, httpOptions);
  }

  SavePattern(oPattern: Pattern)
  {
    this.apiUrl = environment.apiUrl + 'Pattern';
    httpOptions.params = {} 
    return this.http.post<Pattern>(this.apiUrl, oPattern, httpOptions);
  }

  GetPattern(type: string)
  {
    this.apiUrl = environment.apiUrl + 'Pattern';
    httpOptions.params = {type: type} 
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}
