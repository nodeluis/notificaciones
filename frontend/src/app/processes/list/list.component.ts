import { Component, OnInit } from '@angular/core';
import {Process} from "../../_core/models/process.model";
import {ProcessType} from "../../_core/models/processType.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProcessService} from "../../_core/services/process.service";
import {finalize, map} from "rxjs";
import {ProcessMode} from "../../_core/models/processMode.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent{

  processModalIsOpen: boolean = false;
  processes: Process[] = [];
  types: ProcessType[] = [];
  modes: ProcessMode[] = [];
  loadingProcess: boolean = false;
  form: FormGroup = new FormGroup({});

  selectedProcess: Process = new Process();

  constructor(private processService: ProcessService) {
    this.loadProcessTypes();
    this.loadProcessModes();
    this.loadProcesses();
    this.setFormData();
  }

  loadProcesses(){
    this.loadingProcess = true;
    this.processService.getProcesses()
        .pipe(
            map(resp=>resp.data),
            finalize(()=>this.loadingProcess=false)
        ).subscribe(processes=>this.processes = processes);
  }

  onNewBtnClick(){
    this.selectedProcess = new Process();
    this.setFormData();
    this.processModalIsOpen = true;
  }

  setFormData(){
    const process: Process = this.selectedProcess;
    const firstMode: ProcessMode | null = this.modes.length>0? this.modes[0]: null;
    const firstType: ProcessType | null = this.types.length>0? this.types[0]: null;
    this.form = new FormGroup({
      name: new FormControl(''),
      cuce: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl('')
      ]),
      mode: new FormControl(firstMode!=null?firstMode.id: ''),
      type: new FormControl(firstType!=null?firstType.id: '')
    });
  }

  submitForm(){
    const { cuce, ...data } = this.form.value;
    let cuceCode: String = cuce.join('-');
    if(cuceCode == '-----'){
      cuceCode = '';
    }
    const formData = {
      ...data,
      cuce: cuceCode
    }

    this.processService.createProcess(formData).pipe(
        finalize(()=>{
          this.loadProcesses();
          this.processModalIsOpen = false;
        }),
    ).subscribe();
  }

  modalTitle(){
    return (this.selectedProcess.isNew())? 'Nuevo proceso': 'Editar proceso';
  }

  loadProcessTypes(){
    this.processService.getTypes()
        .pipe(
            map(resp=>{
              return resp.data;
            }),
        ).subscribe(types=>this.types = types);
  }

  loadProcessModes(){
    this.processService.getModes()
        .pipe(
            map(resp=>{
              return resp.data;
            }),
        ).subscribe(modes=>this.modes = modes);
  }

  onCuceKey(event: any){
    console.log(event.target);
    console.log(event.target.nextElementSibling);
//    event.preventDefault();
    //event.target.next().focus();
  }

}
