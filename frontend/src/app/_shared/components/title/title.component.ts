import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <section class="title ">
      <h3 class="ma0 df aic"><cds-icon [attr.shape]="icon" [attr.solid]="solid" size="md"></cds-icon><span style="margin-left: .25rem">{{title}}</span></h3>
      {{subtitle}}
    </section>
    <cds-divider class="app-custom"></cds-divider>
  `
})
export class TitleComponent {

  @Input() icon: String = "user";
  @Input() title: String = "";
  @Input() subtitle: String = "";
  @Input() solid: boolean = false;

  constructor() { }

}
