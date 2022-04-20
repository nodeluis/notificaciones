import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ListComponent} from "./list/list.component";
import {ShowComponent} from "./show/show.component";

const routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: ':id',
        component: ShowComponent
      },
      {
        path: '',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }