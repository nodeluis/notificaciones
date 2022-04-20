import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "./services/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./interceptors/api.interceptor";
import {ProcessService} from "./services/process.service";
import {ConfigsService} from "./services/config.service";
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth.service";
import {JwtService} from "./services/jwt.service";
import {HttpTokenInterceptor} from "./interceptors/http_token.interceptor";



@NgModule({
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    AuthService,
    UserService,
    ProcessService,
    ConfigsService,

    AuthGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule { }
