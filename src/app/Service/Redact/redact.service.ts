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
export class RedactService {

  apiUrl: string;

  constructor(private http: HttpClient) { }
  

  uploadFile(file: any){
    let httpOptions: any = { headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}; 

      this.apiUrl = environment.apiUrl + 'Redaction?id=4';
      const formData: FormData = new FormData();
      formData.append('files', file);
      return this.http.post<any>(this.apiUrl, formData, httpOptions);
     //return this.http.get<any>(this.apiUrl);
   }

   search(searchedText: Array<string>, commandType: string, fileName: string, isMatchCase: boolean){
   // this.apiUrl = 'http://localhost:59968/api/Redaction?searchedText=' +searchedText+ '&commandType=' +commandType + '&fileName=' +fileName + '&isMatchCase=' + isMatchCase;
   this.apiUrl = environment.apiUrl + 'Redaction';
   httpOptions.params = {searchedText: searchedText, commandType: commandType, fileName: fileName, isMatchCase: isMatchCase} 
   return this.http.get<any>(this.apiUrl, httpOptions);
 }

 download(fileName: string){
  const headers = new HttpHeaders().set('Content-Type', 'application/pdf; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'blob'
    }
    this.apiUrl = environment.apiUrl + 'Redaction?fileName=' +fileName;
 // this.apiUrl = 'http://localhost:59968/Download/DownloadFile?fileName=' +fileName;
  return this.http.get<any>(this.apiUrl, requestOptions);
}
}
