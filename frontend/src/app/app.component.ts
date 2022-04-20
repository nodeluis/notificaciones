import {Component, OnInit} from '@angular/core';
import {AuthService} from "./_core/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'FrontEnd';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.populate();
  }
}
