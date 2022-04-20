import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../_core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {

  usernameCtrl = new FormControl('');
  passwordCtrl = new FormControl('');

  error: boolean = false;
  loading: boolean = false;

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
  }

  submitForm(event: Event): void{
    event.preventDefault();
    if(!this.loading){
      this.loading = true;
      this.error = false;
      this.authService.attemptAuth(this.usernameCtrl.value, this.passwordCtrl.value)
          .subscribe({
            next: ()=>{
              console.log("it work");
              this.authService.populate();
              this.router.navigateByUrl('/')
            },
            error: (err) => {
              this.error = true;
              this.loading = false;
            },
            complete: ()=>{this.loading = false}
          });
    }

  }

}
