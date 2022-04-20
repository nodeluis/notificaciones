import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkAuth(state.url);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkAuth(state.url);
    }

    private checkAuth(url: String):Observable<boolean | UrlTree>{
        return this.authService.isAuthenticated.pipe(
            take(1),
            map(isAuth=>{
                console.log("isAuth", isAuth);
                if(isAuth){
                    return url == '/login' ?  this.router.parseUrl('/'): true;
                }
                return url == '/login' ?  true: this.router.parseUrl('/login');
            })
        );
    }

}