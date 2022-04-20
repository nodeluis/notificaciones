export class Action {
    id: string;
    name: string;
    description: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.description = "";
    }

    isNew(){
        return this.id.length===0;
    }

    titleForModal(){
        return this.isNew()? 'Nueva accion': 'Editar acccion'
    }
}