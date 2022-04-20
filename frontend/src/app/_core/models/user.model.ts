export class User {
    id: string;
    username: string;
    fullname: string;
    phone: string;
    roles: string[];

    constructor() {
        this.id = "";
        this.username = "";
        this.fullname = "";
        this.phone = "";
        this.roles = [];
    }

    isNew(){
        return this.id.length===0;
    }

}