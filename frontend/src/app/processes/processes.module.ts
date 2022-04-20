import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import {ProcessesRoutingModule} from "./processes-routing.module";
import {SharedModule} from "../_shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShowComponent} from "./show/show.component";

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProcessesRoutingModule,
  ]
})
export class ProcessesModule { }
