import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RedactService } from '@app/Service/Redact/redact.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RedactManager {
    constructor( private oRedactService: RedactService){

    }

    uploadFile(file: any): Observable<any>{
        return this.oRedactService.uploadFile(file).pipe(map((response: any) => response));
    }

    search(searchedText:Array<string>, commandType: string, fileName: string, isMatchCase: boolean): Observable<any>{
        return this.oRedactService.search(searchedText, commandType, fileName, isMatchCase).pipe(map((response: any) => response));
    }

    download(fileName: string): Observable<any>{
        return this.oRedactService.download(fileName).pipe(map((response: any) => response));
    }
}