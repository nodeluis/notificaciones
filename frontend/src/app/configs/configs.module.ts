import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {SharedModule} from "../_shared/shared.module";
import {ConfigsRoutingModule} from "./configs-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ConfigsRoutingModule
  ]
})
export class ConfigsModule { }
