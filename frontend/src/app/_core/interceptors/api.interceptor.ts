import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment as env } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = env.baseUrl;
        const apiReq = req.clone({
            url: `${baseUrl}/api/${req.url}`
        });
        return next.handle(apiReq);
    }
}