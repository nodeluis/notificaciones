import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Activity} from "../../_core/models/activity.model";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import {ProcessService} from "../../_core/services/process.service";
import {finalize, map} from "rxjs";
import {Contact} from "../../_core/models/contact.model";
import {Process} from "../../_core/models/process.model";
import {Action} from "../../_core/models/action.model";
import {ProcessAction} from "../../_core/models/processAction.model";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styles: [
  ]
})
export class ShowComponent{

  loadingActivities: boolean = false;
  selectedActivity: Activity = new Activity();
  activityForm: FormGroup = new FormGroup({});
  activityModalIsOpen: boolean = false;
  activities: Activity[] = [];

  loadingContacts: boolean = false;
  selectedContact: Contact = new Contact();
  contactForm: FormGroup = new FormGroup({});
  contactModalIsOpen: boolean = false;
  contacts: Contact[] = [];

  loadingActions: boolean = false;
  actions: Action[] = [];
  actionsForForm: Action[] = [];
  actionModalIsOpen: boolean = false;
  actionForm: FormGroup = new FormGroup({
    action: new FormControl(''),
    limitDate: new FormControl(''),
    done: new FormControl(false)
  });
  selectedAction: Action = new Action();
  processActions: ProcessAction[] = [];

  processId: String = '###';

  currentProcess: Process = new Process();

  constructor(
      private route: ActivatedRoute,
      private processService: ProcessService
  ) {
    this.setActivityData();
    this.setContactData();
    this.route.params.subscribe(params=>{
      const {id: processId } = params;
      this.processId = processId;
      this.loadProcess();
      this.loadActivities();
      this.loadContacts();
    });
  }



  onNewActivity(){
    this.selectedActivity = new Activity();
    this.setActivityData();
    this.activityModalIsOpen = true;
  }

  onNewAction(){
    this.selectedAction = new Action();
    this.setActionData();
    this.actionModalIsOpen = true;
  }

  onNewContact(){
    this.selectedContact = new Contact();
    this.setContactData();
    this.contactModalIsOpen = true;
  }

  setActivityData(){
    const activity: Activity = this.selectedActivity;
    this.activityForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      limitDate: new FormControl(''),
      done: new FormControl(false)
    });
  }

  setActionData(){
    //const activity: Activity = this.selectedActivity;
    const self = this;
    self.actionsForForm = self.actions.filter(a=>{
      return !self.processActions.find(pa=>pa.action.id==a.id);
    });

    if(self.actionsForForm.length>0){
      self.selectedAction = self.actionsForForm[0];
    }

    this.actionForm = new FormGroup({
      action: new FormControl(self.selectedAction.id),
      limitDate: new FormControl(''),
      done: new FormControl(false)
    });
  }

  changeAction(event: any){
    const value = event.target.value;
    const newAction = this.actions.find(a=>a.id == value);
    if(newAction){
      this.selectedAction = newAction;
    }

  }

  setContactData(){
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      position: new FormControl(''),
      phone: new FormControl(''),
      notify: new FormControl(true)
    });
  }

  submitActivityForm(){
    const { limitDate, ...restForm } = this.activityForm.value;

    const formData = {
      ...restForm,
      limitDate: moment(limitDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    };

    this.processService.addActivityToProcess(this.processId, formData).pipe(
        finalize(()=>{

        })
    ).subscribe(()=>{
      this.loadActivities();
      this.activityModalIsOpen = false;
    });
  }

  submitActionForm(){
    const { limitDate, ...restForm } = this.actionForm.value;

    const formData = {
      ...restForm,
      limitDate: moment(limitDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    };

    this.processService.addActionToProcess(this.processId, formData).pipe(
        finalize(()=>{

        })
    ).subscribe(()=>{
      this.loadProcess();
      this.actionModalIsOpen = false;
    });
  }

  submitContactForm(){
    const formData = {
      ...this.contactForm.value
    };

    this.processService.addContactToProcess(this.processId, formData).pipe(
        finalize(()=>{
        })
    ).subscribe(()=>{
      this.loadContacts();
      this.contactModalIsOpen = false;
    });
  }

  loadActivities(){
    this.loadingActivities = true;
    this.processService.getActivitiesByProcessId(this.processId)
        .pipe(
            map(resp=>resp.data),
            finalize(()=>this.loadingActivities=false)
        ).subscribe(activities=>this.activities = activities);

  }

  loadContacts(){
    this.loadingContacts = true;
    this.processService.getContactsByProcessId(this.processId)
        .pipe(
            map(resp=>resp.data),
            finalize(()=>this.loadingContacts=false)
        ).subscribe(contacts=>this.contacts=contacts);
  }

  loadProcess(){
    this.processService.getProcessById(this.processId)
        .pipe(
            map(resp=>resp.data),
        ).subscribe(process=>{
          this.currentProcess = process;
          this.loadActions();
          this.loadProcessActions();
        });
  }

  loadActions(){
    const self = this;
    self.processService.getProcessActionsByTypeAndMode(self.currentProcess.type.id, self.currentProcess.mode.id)
        .pipe(
            map(resp=>resp.data)
        ).subscribe(actions=>this.actions = actions);

  }

  loadProcessActions(){
    const self = this;
    self.loadingActions = true;
    self.processService.getLinkedActionsByProcessId(self.processId)
        .pipe(
            map(resp=>resp.data),
            finalize(()=>this.loadingActions=false)
        ).subscribe(actions=>{
          console.log(actions);
      this.processActions = actions
    });

  }
}
