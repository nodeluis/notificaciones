import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, distinctUntilChanged, Observable, ReplaySubject} from "rxjs";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {JwtService} from "./jwt.service";
import {map} from "rxjs/operators";

@Injectable()
export class AuthService {

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private userService: UserService,
        private http: HttpClient,
        private jwtService: JwtService
    ) {}

// Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        //this.isAuthenticatedSubject.next(true);
        const self = this;
        if (self.jwtService.getToken()) {
            self.userService.getProfile()
                .pipe(
                    map((resp: any)=>{
                        return resp.data;
                    }),
                )
                .subscribe({
                    next: user => {
                        self.currentUserSubject.next(user);
                        self.isAuthenticatedSubject.next(true);
                    },
                    error: error => this.purgeAuth()
                });
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(resp: any) {
        // Save JWT sent from server in localstorage
        if(resp.access_token){
            this.jwtService.saveToken(resp.access_token);
        }
        // Set current user data into observable
        //this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        //this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new User());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(username: string, password: string) {
        return this.userService.login(username, password)
            .pipe(map(
                (resp: any) => {
                    this.setAuth(resp.data);
                }
            ))  ;
    }

}