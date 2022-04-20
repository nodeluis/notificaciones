import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../../_core/interfaces/menuItem.interface';
import {AuthService} from "../../../_core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent{

  menuItems: MenuItem[] = [
    {
      label: "Usuarios",
      link: "users",
      icon: "users"
    },
    {
      label: "Configuraciones",
      link: "configs",
      icon: "cog",
    },
    {
      label: "Sender",
      link: "senders",
      icon: "envelope"
    },
    {
      label: "Procesos de contratacion",
      link: "processes",
      icon: "folder-open"
    }
  ];

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  logout(){
    this.authService.purgeAuth();
    this.router.navigateByUrl('/login');
  }

}
