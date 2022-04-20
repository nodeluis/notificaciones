import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";

const routes = [
  {
    path: '',
    component: MainComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }