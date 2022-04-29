export class Pattern{
    patternID: number;
    patternText: string;
    createdOn: string;
    isActive: boolean;
    description: string;
    groupPatternID: number;
    groupPatternName: string;

    constructor(){
        this.patternID = 0;
        this.patternText = '';
        this.createdOn = '';
        this.isActive =true;
        this.description = '';
        this.groupPatternID = 0;
        this.groupPatternName = '';
    }
}