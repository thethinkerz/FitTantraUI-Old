import { Component, OnInit } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {RedactManager } from '@app/Manager/Redact/redactmanager';
import { map, filter, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-redact',
  templateUrl: './redact.component.html',
  styleUrls: ['./redact.component.css']
})
export class RedactComponent implements OnInit {

  title = 'RTClient';
  file: any;
  pdfFilePath = "C:/Users/suvrapratim.das/Downloads/test.pdf";
  searchedText: string = '';
  redactText : string = '';
  pdfSrc: string = 'assets/test.pdf';
  orgFileName: string = '';
  editedFileName: string = '';
  textFound: boolean = false;
  isMatchCase: boolean = false;
  lstSearchText: Array<string>= [];
  activeMenu1: boolean = true;
  activeMenu2: boolean = false;
  activeMenu3: boolean = false;
  activeMenu4: boolean = false;
  activeMenu5: boolean = false;
  constructor(private http: HttpClient, private oRedactManager: RedactManager, private toastrService: ToastrService){
    //pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit(): void {
  }

  addtext(){
    debugger;
    if(this.searchedText != '')
    {
      this.lstSearchText.push(this.searchedText);
    }
  }

  upload(event: any) {
    debugger
    this.file = event.target.files[0];

    this.oRedactManager.uploadFile(this.file).pipe(map((response: any) => response)).subscribe((data: any) => { 
      debugger;
      this.pdfSrc = 'assets/' + data.FileName;
      this.orgFileName = data.FileName;
    });

    // const formData: FormData = new FormData();
    //     formData.append('files', this.file);
    //     var res = this.http.post('http://localhost:59968/api/Redaction', formData).subscribe()
       
  }

  search(){
    debugger
    if(this.file != undefined) {
      if(this.lstSearchText.length > 0){
        this.pdfSrc = 'assets/' + this.orgFileName;
        this.oRedactManager.search(this.lstSearchText, 'Search', this.orgFileName, this.isMatchCase).pipe(map((response: any) => response)).subscribe((data: any) => { 
          debugger;
          if(data.isFound){
            this.toastrService.success("Searched text found");
            this.textFound = true;
          }
          else{
            this.toastrService.warning("Searched text not found");
          }
          
          this.editedFileName = data.FileName;
          this.redactText = JSON.parse(JSON.stringify(this.searchedText));
          this.pdfSrc = 'assets/' + data.FileName;
        });
      }
      else{
        //alert('Please enter search test');
        this.toastrService.error('Please enter search text')
      }
    }
    else{
     // alert('Please upload file')
      this.toastrService.error('Please upload file')
    }
    
    
  }

  redact(){
    debugger
    if(this.textFound){
    //this.pdfSrc = 'assets/' + this.orgFileName;
    this.oRedactManager.search(this.lstSearchText, 'Redact', this.orgFileName, this.isMatchCase).pipe(map((response: any) => response)).subscribe((data: any) => { 
      debugger;
      this.editedFileName = data.FileName;
      this.pdfSrc = 'assets/' + data.FileName;
      });
    }
    else{
   
      this.toastrService.error('Search text first then reduct')
    }
   
  }

  download(){
    debugger
    if(this.file != undefined){
      //this.pdfSrc = 'assets/' + this.orgFileName;
      if(this.editedFileName != ''){
        this.oRedactManager.download(this.editedFileName).pipe(map((response: any) => response)).subscribe((data: any) => { 
          debugger;
          var file = new Blob([data], { type: 'application/pdf' })
              var fileURL = URL.createObjectURL(file);
  
        // if you want to open PDF in new tab
              //window.open(fileURL); 
              var a         = document.createElement('a');
              a.href        = fileURL; 
              a.target      = '_blank';
              a.download    = this.editedFileName;
              document.body.appendChild(a);
              a.click();
          //this.pdfSrc = 'assets/' + data.FileName;
        });
      }
      
    }
    else{
      this.toastrService.error('Please upload file')
    }
    
  }

  reload(){
    debugger
    this.editedFileName = this.orgFileName;
    this.pdfSrc = 'assets/' + this.editedFileName;
  }

  onTagRemoved(tag: string) {
    const index = this.lstSearchText.findIndex(t => t === tag);
    if (index !== -1) {
      this.lstSearchText = [ ...this.lstSearchText.slice(0, index), ...this.lstSearchText.slice(index + 1) ];
    }
  }

  onTagAdded(tag: string) {
    // const index = this.tags.findIndex(t => t.name.toLowerCase() === tag.name.toLowerCase());
    // if (index === -1) {
    //   this.tags = [ ...this.tags, tag ];
    // }
    debugger
    //this.searchedText = "asdsad";
    if(tag != '')
    {
      this.lstSearchText.push(tag);
      console.log(this.lstSearchText)
    }
  }

  chnageMenu(menu: string){
    if(menu == "menu1"){
      this.activeMenu1 = true;
      this.activeMenu2 = false;
      this.activeMenu3 = false;
      this.activeMenu4 = false;
      this.activeMenu5 = false;
    }
    else if(menu == "menu2"){
      this.activeMenu1 = false;
      this.activeMenu2 = true;
      this.activeMenu3 = false;
      this.activeMenu4 = false;
      this.activeMenu5 = false;
    }
    else if(menu == "menu3"){
      this.activeMenu1 = false;
      this.activeMenu2 = false;
      this.activeMenu3 = true;
      this.activeMenu4 = false;
      this.activeMenu5 = false;
    }
    else if(menu == "menu4"){
      this.activeMenu1 = false;
      this.activeMenu2 = false;
      this.activeMenu3 = false;
      this.activeMenu4 = true;
      this.activeMenu5 = false;
    }
    else if(menu == "menu5"){
      this.activeMenu1 = false;
      this.activeMenu2 = false;
      this.activeMenu3 = false;
      this.activeMenu4 = false;
      this.activeMenu5 = true;
    }
  }

}
