import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class UserService{

    private baseUrl: string = "users";
    private profileUrl: string = "auth/profile";
    private loginUrl: string = "auth/login";

    constructor(private http: HttpClient) {}

    getUsers(): Observable<any>{
        return this.http.get(this.baseUrl);
    }

    getUserById(): Observable<any>{
        return this.http.get(this.baseUrl);
    }

    createUser(newUser: Object): Observable<any>{
        return this.http.post(this.baseUrl, newUser);
    }

    getProfile(){
        return this.http.get(this.profileUrl);
    }

    login(username: string, password: string){
        return this.http.post(this.loginUrl, {
            username, password
        });
    }
}