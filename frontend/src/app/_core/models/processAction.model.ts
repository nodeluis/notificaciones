import {Action} from "./action.model";

export class ProcessAction {
    id: string;
    limitDate: Date;
    done: boolean;
    action: Action;

    constructor() {
        this.id = "";
        this.limitDate = new Date();
        this.done = false;
        this.action = new Action();
    }

    isNew(){
        return this.id.length===0;
    }

    titleForModal(){
        return this.isNew()? 'Nueva accion': 'Editar acccion'
    }
}