import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./_shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import localeBo  from '@angular/common/locales/es-BO';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeBo);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-bo'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
