import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {SharedModule} from "../_shared/shared.module";
import {SendersRoutingModule} from "./senders-routing.module";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SendersRoutingModule
  ]
})
export class SendersModule { }