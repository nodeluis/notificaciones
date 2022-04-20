import {ProcessType} from "./processType.model";
import {ProcessMode} from "./processMode.model";

export class Process {
    id: string;
    name: string;
    cuceCode: string;
    type: ProcessType;
    mode: ProcessMode;

    constructor() {
        this.id = "";
        this.name = "";
        this.cuceCode = "";
        this.type = new ProcessType();
        this.mode = new ProcessMode();
    }

    isNew(){
        return this.id.length===0;
    }

}