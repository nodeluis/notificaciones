import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdsModule } from "@cds/angular";
import { ClarityModule } from '@clr/angular'
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./layouts/admin/admin.component";
import {AuthComponent} from "./layouts/auth/auth.component";
import { TitleComponent } from './components/title/title.component';
import {CoreModule} from "../_core/core.module";

import {
  calendarIcon, ClarityIcons, cogIcon,
  envelopeIcon, folderOpenIcon, userIcon,
  usersIcon, logoutIcon, plusIcon,
  pencilIcon, eyeIcon
} from '@cds/core/icon';
ClarityIcons.addIcons(
    userIcon, usersIcon, cogIcon, folderOpenIcon,
    envelopeIcon, calendarIcon, logoutIcon, plusIcon,
    eyeIcon, pencilIcon
)

import '@cds/core/button/register.js';
import '@cds/core/icon/register.js';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      AdminComponent,
      AuthComponent,
      TitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdsModule,
    ClarityModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    TitleComponent,
    ClarityModule,
    CdsModule
  ]
})
export class SharedModule { }
