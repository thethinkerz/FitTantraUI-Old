import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PatternService } from '@app/Service/Pattern/pattern.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';
import { Pattern } from '@app/Model/pattern';

@Injectable({
    providedIn: 'root'
})

export class PatternManager {
    constructor( private oPatternService: PatternService){

    }

    private observableListPattern = new BehaviorSubject(new Array<Pattern>());

    CheckRegxPattern(patternText: string, textValidate: string): Observable<any>{
        return this.oPatternService.CheckRegxPattern(patternText, textValidate).pipe(map((response: any) => response));
    }

    SavePattern(oPattern: Pattern): Observable<any>{
        return this.oPatternService.SavePattern(oPattern).pipe(map((response: any) => response));
    }

    GetPattern(type: string): Observable<any>
    {
        debugger;
        let lstPattern: Array<Pattern> = null || [];

        this.oPatternService.GetPattern(type).pipe(map((response: any) => response)).subscribe((data: any) => 
        {
            debugger;
            let lstPattern: Array<Pattern> = [];
            if (data.Success){
                debugger
                for(var i= 0; i < data.LstPattern.length; i++){
                    let oPattern = new Pattern();
                    oPattern.patternID = data.LstPattern[i].PatternID;
                    oPattern.patternText = data.LstPattern[i].PatternText;
                    oPattern.description = data.LstPattern[i].Description;
                    oPattern.createdOn = data.LstPattern[i].CreatedOn;
                    oPattern.groupPatternID = data.LstPattern[i].GroupPatternID;
                    oPattern.groupPatternName = data.LstPattern[i].GroupPatternName;
                    oPattern.isActive = data.LstPattern[i].IsActive;
                    lstPattern.push(oPattern);
                }
                
                
                this.observableListPattern.next(lstPattern);
                return this.observableListPattern.asObservable();
            }
            else{
                this.observableListPattern.next(lstPattern);
                return this.observableListPattern.asObservable();
            }
        });

        this.observableListPattern.next(lstPattern);
        return this.observableListPattern.asObservable();

    }
}