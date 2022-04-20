import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './_shared/layouts/admin/admin.component';
import { AuthComponent } from './_shared/layouts/auth/auth.component';
import { NotFoundComponent } from "./_shared/layouts/not-found/not-found.component";
import {AuthGuard} from "./_core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/processes',
        pathMatch: 'full'
      },
      {
        path: "processes",
        loadChildren: ()=>import('./processes/processes.module').then(m=>m.ProcessesModule)
      },
      {
        path: "users",
        loadChildren: ()=>import('./users/users.module').then(m=>m.UsersModule)
      },
      {
        path: "configs",
        loadChildren: ()=>import('./configs/configs.module').then(m=>m.ConfigsModule)
      },
      {
        path: "senders",
        loadChildren: ()=>import('./senders/senders.module').then(m=>m.SendersModule)
      }
    ]
  },
  {
    path: "login",
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}