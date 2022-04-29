import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pagination } from '@app/Model/pagination';

@Injectable({
    providedIn: 'root'
})

export class CommonLookUpManager{
    constructor(){

    }

    getPagination(): Pagination {
        let oPagination = new Pagination();
        oPagination.currentPage = 0;
        oPagination.itemsPerPage = 10;
        oPagination.showNextLink = false;
        oPagination.showPrevLink = false;
        oPagination.lstItemsPerPage = [];
        oPagination.lstItemsPerPage.push({ value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 20, name: '20' },
          { value: 30, name: '30' },
          { value: 40, name: '40' });
        return oPagination;
    }
}