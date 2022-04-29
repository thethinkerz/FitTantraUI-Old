import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GrouppatternService } from '@app/Service/GroupPattern/grouppattern.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';
import { GroupPattern } from '@app/Model/grouppattern';

@Injectable({
    providedIn: 'root'
})

export class GroupPatternManager{

    constructor( private oGrouppatternService: GrouppatternService){

    }

    private observableListGroupPattern = new BehaviorSubject(new Array<GroupPattern>());

    GetGroupPattern(groupId: number, isActive: any): Observable<any>
    {
        debugger;
        let lstGroupPattern: Array<GroupPattern> = null || [];

        this.oGrouppatternService.GetGroupPattern(groupId, isActive).pipe(map((response: any) => response)).subscribe((data: any) => 
        {
            debugger;
            let lstGroupPattern: Array<GroupPattern> = [];
            if (data.Success){
                debugger
                for(var i= 0; i < data.LstGroup.length; i++){
                    let oGroupPattern = new GroupPattern();
                    oGroupPattern.date = data.LstGroup[i].Date;
                    oGroupPattern.groupPatternID = data.LstGroup[i].GroupPatternID;
                    oGroupPattern.groupPatternName = data.LstGroup[i].GroupPatternName;
                    oGroupPattern.groupStatus = data.LstGroup[i].GroupStatus;
                    lstGroupPattern.push(oGroupPattern);
                }
                
                
                this.observableListGroupPattern.next(lstGroupPattern);
                return this.observableListGroupPattern.asObservable();
            }
            else{
                this.observableListGroupPattern.next(lstGroupPattern);
                return this.observableListGroupPattern.asObservable();
            }
        });

        this.observableListGroupPattern.next(lstGroupPattern);
        return this.observableListGroupPattern.asObservable();

    }

}