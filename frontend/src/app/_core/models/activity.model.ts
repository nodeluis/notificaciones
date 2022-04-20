export class Activity {
    id: string;
    title: string;
    description: string;
    limitDate: Date;
    done: boolean;

    constructor() {
        this.id = "";
        this.title = "";
        this.description = "";
        this.limitDate = new Date();
        this.done = false;
    }

    isNew(){
        return this.id.length===0;
    }

    titleForModal(){
        return this.isNew()? 'Nueva actividad': 'Editar actividad'
    }
}