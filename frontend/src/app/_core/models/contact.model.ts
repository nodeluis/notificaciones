export class Contact {
    id: string;
    name: string;
    phone: string;
    position: string;
    notify: boolean;

    constructor() {
        this.id = "";
        this.name = "";
        this.phone = "";
        this.position = "";
        this.notify = false;
    }

    isNew(){
        return this.id.length===0;
    }

    titleForModal(){
        return this.isNew()? 'Nuevo contacto': 'Editar contacto'
    }

}