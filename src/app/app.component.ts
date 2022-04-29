import { Component } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {RedactManager } from '@app/Manager/Redact/redactmanager';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RTClient';
  file: any;
  pdfFilePath = "C:/Users/suvrapratim.das/Downloads/test.pdf";
  searchedText: string = '';
  redactText : string = '';
  pdfSrc: string = 'assets/test.pdf';
  orgFileName: string = '';
  editedFileName: string = '';
  
  constructor(private http: HttpClient, private oRedactManager: RedactManager){
    //pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  // upload(event: any) {
  //   debugger
  //   this.file = event.target.files[0];

  //   this.oRedactManager.uploadFile(this.file).pipe(map((response: any) => response)).subscribe((data: any) => { 
  //     debugger;
  //     this.pdfSrc = 'assets/' + data.FileName;
  //     this.orgFileName = data.FileName;
  //   });

  //   // const formData: FormData = new FormData();
  //   //     formData.append('files', this.file);
  //   //     var res = this.http.post('http://localhost:59968/api/Redaction', formData).subscribe()
       
  // }

  // search(){
  //   debugger
  //   if(this.file != undefined) {
  //     if(this.searchedText != ''){
  //       this.pdfSrc = 'assets/' + this.orgFileName;
  //       this.oRedactManager.search(this.searchedText, 'Search', this.orgFileName).pipe(map((response: any) => response)).subscribe((data: any) => { 
  //         debugger;
  //         this.editedFileName = data.FileName;
  //         this.redactText = JSON.parse(JSON.stringify(this.searchedText));
  //         this.pdfSrc = 'assets/' + data.FileName;
  //       });
  //     }
  //     else{
  //       alert('Please enter search test');
  //     }
  //   }
  //   else{
  //     alert('Please upload file')
  //   }
    
    
  // }

  // redact(){
  //   debugger
  //   if(this.redactText!= ''){
  //   //this.pdfSrc = 'assets/' + this.orgFileName;
  //   this.oRedactManager.search(this.redactText, 'Redact', this.orgFileName).pipe(map((response: any) => response)).subscribe((data: any) => { 
  //     debugger;
  //     this.editedFileName = data.FileName;
  //     this.pdfSrc = 'assets/' + data.FileName;
  //     });
  //   }
  //   else{
  //     alert('Search text first then reduct');
  //   }
   
  // }

  // download(){
  //   debugger
  //   if(this.file != undefined){
  //     //this.pdfSrc = 'assets/' + this.orgFileName;
  //     if(this.editedFileName != ''){
  //       this.oRedactManager.download(this.editedFileName).pipe(map((response: any) => response)).subscribe((data: any) => { 
  //         debugger;
  //         var file = new Blob([data], { type: 'application/pdf' })
  //             var fileURL = URL.createObjectURL(file);
  
  //       // if you want to open PDF in new tab
  //             window.open(fileURL); 
  //             var a         = document.createElement('a');
  //             a.href        = fileURL; 
  //             a.target      = '_blank';
  //             a.download    = this.editedFileName;
  //             document.body.appendChild(a);
  //             a.click();
  //         //this.pdfSrc = 'assets/' + data.FileName;
  //       });
  //     }
      
  //   }
  //   else{
  //     alert('Please upload file')
  //   }
    
  // }

  // reload(){
  //   this.pdfSrc = 'assets/' + this.orgFileName;
  // }
}
