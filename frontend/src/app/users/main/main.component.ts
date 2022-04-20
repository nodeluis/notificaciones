import { Component, OnInit } from '@angular/core';
import {User} from "../../_core/models/user.model";
import {UserService} from "../../_core/services/user.service";
import {finalize, map} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent{

  userModalIsOpen: boolean = false;
  users: User[] = [];
  loadingUsers: boolean = false;
  form: FormGroup = new FormGroup({});

  selectedUser: User = new User();

  constructor(private userService: UserService) {
    this.loadUsers();
    this.setFormData();
  }

  onNewBtnClick(){
    this.selectedUser = new User();
    this.setFormData();
    this.userModalIsOpen = true;
  }

  loadUsers(){
    this.loadingUsers = true;
    this.userService.getUsers()
        .pipe(
            map(resp=>resp.data),
            finalize(()=>this.loadingUsers=false)
        ).subscribe(users=>this.users=users);
  }

  setFormData(){
    const user: User = this.selectedUser;
    this.form = new FormGroup({
      username: new FormControl(user.username),
      fullname: new FormControl(user.fullname),
      phone: new FormControl(user.phone),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      roles: new FormArray([])
    });
  }

  submitForm(){
    this.userService.createUser(this.form.value).pipe(
        finalize(()=>{
          this.loadUsers();
          this.userModalIsOpen = false;
        })
    ).subscribe();
  }

  modalTitle(){
    return (this.selectedUser.isNew())? 'Nuevo usuario': 'Editar usuario';
  }

  //TODO
  // @ts-ignore
  onRoleChange(event){
    const formArray: FormArray = this.form.get('roles') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }else{
      // @ts-ignore
      formArray.controls.forEach((ctrl: FormControl, index: number)=>{
        if(ctrl.value === event.target.value){
          formArray.removeAt(index);
          return;
        }
      });
    }
  }

}
