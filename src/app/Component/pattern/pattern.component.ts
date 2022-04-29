import { Component, OnInit } from '@angular/core';
import { RegxType } from '@app/Enum/RegxType'
import { SubmitType } from '@app/Enum/submitType'
import { Pattern } from '@app/Model/pattern';
import { GroupPattern } from '@app/Model/grouppattern';
import { PatternManager } from '@app/Manager/Pattern/patternmanager';
import { GroupPatternManager } from '@app/Manager/GroupPattern/grouppatternmanager';
import { ToastrService } from 'ngx-toastr';
import { map, filter, first } from 'rxjs/operators';
import { CommonLookUpManager } from '@app/Manager/commonLookUpManager';
import { Pagination } from '@app/Model/pagination';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css']
})
export class PatternComponent implements OnInit {

  constructor(private oPatternManager: PatternManager, private oToastrService: ToastrService,
    private oCommonLookUpManager: CommonLookUpManager, private oGroupPatternManager: GroupPatternManager) { }

  regxType: string = '';
  //NUMERIC//
  numericRange: string = '';
  minimumDigitNumeric: string = '';
  maximumDigitNumeric: string = '';
  //UPPER//
  upperStart: string = 'A';
  upperEnd: string = 'A';
  letterAcceptUpper: string = '';
  //LOWER//
  lowerStart: string = 'a';
  lowerEnd: string = 'a';
  letterAcceptLower: string = '';
  //SPECIAL//
  specialCharacter: string = "0";
  //MIXED//
  mixedLetter: string = '';
  letterAccept: string = ''

  public oPattern : Pattern;
  lstGroupPattern: Array<GroupPattern> = [];
  isCompleteButtonEnable: boolean = false;
  isAddButtonEnable: boolean= true;
  isComplete: boolean = false;

  textValidate: string = '';
  isvalidTextClass: string = '';

  lstPattern: Array<Pattern> = [];

  helpModalShow: boolean = false;

  oPagination: Pagination;
  
  public get regxTypeResult(): typeof RegxType {
    return RegxType; 
  }

  public get submitTypeResult(): typeof SubmitType {
    return SubmitType; 
  }

  ngOnInit(): void {
    this.oPattern = new Pattern();
    this.oPattern.groupPatternID 
    this.GetPattern(); 
    this.oPagination = new Pagination();
    this.oPagination = this.oCommonLookUpManager.getPagination();
    this.GetGroupPattern();
  }

  onSubmit(submitType: string){
    debugger
    if(submitType == SubmitType.Add)
    {
      if(this.oPattern.patternText == '')
      {
        this.oPattern.patternText = '^';
      }
      if(this.regxType == RegxType.Numeric)
      {
        if(this.numericRange != '' && this.minimumDigitNumeric != '' && this.maximumDigitNumeric != '')
        {
          this.oPattern.patternText = this.oPattern.patternText + "[" + this.numericRange + "]" + "{" + this.minimumDigitNumeric + "," + this.maximumDigitNumeric + "}";
          this.isCompleteButtonEnable = true;
          this.clearFields();
        } 
        else{
           this.oToastrService.error('Enter fields properly');
        }    
      
      }
      else if(this.regxType == RegxType.UpperCharacter)
      {
        if(this.upperStart != '' && this.upperEnd != '' && this.letterAcceptUpper != '')
        {
          this.oPattern.patternText = this.oPattern.patternText + "[" + this.upperStart + "-" + this.upperEnd + "]" + "{" + this.letterAcceptUpper + "}";
          this.isCompleteButtonEnable = true;
          this.clearFields();
        }
        else{
          this.oToastrService.error('Enter fields properly');
       }
      }
      else if(this.regxType == RegxType.LowerCharacter)
      {
        if(this.lowerStart != '' && this.lowerEnd != '' && this.letterAcceptLower != '')
        {
          this.oPattern.patternText = this.oPattern.patternText + "[" + this.lowerStart + "-" + this.lowerEnd + "]" + "{" + this.letterAcceptLower + "}";
          this.isCompleteButtonEnable = true;
          this.clearFields();
        }
        else{
          this.oToastrService.error('Enter fields properly');
       }
      }
      else if(this.regxType == RegxType.SpecialCharacter)
      {
        if(this.specialCharacter != '0')
        {
          this.oPattern.patternText = this.oPattern.patternText + "\\" + this.specialCharacter;
          this.isCompleteButtonEnable = true;
          this.clearFields();
        }
        else{
          this.oToastrService.error('Enter fields properly');
       }
      }
      else if(this.regxType == RegxType.Mixed)
      {
        if(this.mixedLetter != '' && this.letterAccept != '')
        {
          this.oPattern.patternText = this.oPattern.patternText + this.mixedLetter + "" + "{" + this.letterAccept + "}";
          this.isCompleteButtonEnable = true;
          this.clearFields();
        }
        else{
          this.oPattern.patternText = this.oPattern.patternText + "" + this.mixedLetter + "";
          this.isCompleteButtonEnable = true;
          this.clearFields();
          
          this.oToastrService.error('Enter fields properly');
         
        }
      }
    }
    else if(submitType == SubmitType.Reset){
      this.reset();
    }
    else if(submitType == SubmitType.Complete){
      if (this.oPattern.patternText != '^') {
        this.oPattern.patternText = this.oPattern.patternText + "$";
        this.isComplete = true;
        this.isAddButtonEnable = false;
      }
    }
    
  }

  reset(){
    this.isCompleteButtonEnable = false;
    this.isAddButtonEnable  = true;
    this.isComplete = false;
    this.regxType = '';
    this.clearFields();
    this.oPattern.patternText = '';
    this.isvalidTextClass = '';
  }

  resetPopup(){
    this.reset();
    this.oPattern = new Pattern();
  }

  clearFields(){
    //NUMERIC//
    this.numericRange = '';
    this.minimumDigitNumeric = '';
    this.maximumDigitNumeric = '';
    //UPPER//
    this.upperStart = 'A';
    this.upperEnd = 'A';
    this.letterAcceptUpper = '';
    //LOWER//
    this.lowerStart = 'a';
    this.lowerEnd = 'a';
    this.letterAcceptLower = '';
    //SPECIAL//
    this.specialCharacter = '0';
    this.textValidate = '';
  }

  checkRegx(){
    if(this.textValidate != ''){
      this.oPatternManager.CheckRegxPattern(this.oPattern.patternText, this.textValidate).pipe(map((response: any) => response)).subscribe((data: any) => { 
        debugger;
        if(data.Success){
          
          this.isvalidTextClass = 'fa fa-check';
  
        }
        else{
          this.isvalidTextClass = 'fa fa-times';
        
        }
      });
    }
    else{
      this.oToastrService.error('Please enter text to validate')
    }
    
  }

  SavePattern(){
   
    debugger;
    this.oPatternManager.SavePattern(this.oPattern).pipe(map((response: any) => response)).subscribe((data: any) => { 
      debugger;
      if(data.Success){
        this.oToastrService.success('Pattern saved successfully')
        this.resetPopup();
      }
    });
  }

  GetPattern(){
 
    debugger;
    this.lstPattern = [];
    this.oPatternManager.GetPattern('').pipe(map((response: any) => response), first(val => val.length > 0)).subscribe((data: any) => {
      this.lstPattern = data;
    });
  }

  pageOutOfBound(event: any) {
    this.oPagination.currentPage = event;
  }

  GetGroupPattern(){
    this.lstGroupPattern = [];
    debugger;
    this.lstPattern = [];
    this.oGroupPatternManager.GetGroupPattern(0, 1).pipe(map((response: any) => response), first(val => val.length > 0)).subscribe((data: any) => {
      debugger
      this.lstGroupPattern = data;
    });
  }
}
