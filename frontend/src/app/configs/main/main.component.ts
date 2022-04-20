import { Component, OnInit } from '@angular/core';
import {ConfigsService} from "../../_core/services/config.service";
import {config, finalize, map} from "rxjs";
import {Configuration} from "../../_core/models/configuration.model";
import {ConfigsModule} from "../configs.module";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: "./main.component.html",
  styles: [
  ]
})
export class MainComponent{

  configs: Configuration = new Configuration();
  configForm: FormGroup = new FormGroup({
    'weekend': new FormControl(this.configs.weekend),
    'daysBefore': new FormControl(this.configs.daysBefore),
    'time': new FormControl(this.configs.time)
  });

  editable: boolean = false;

  constructor(
      private configService: ConfigsService
  ) {
    this.loadData();
  }

  loadData(){
    this.setFormData();
    this.configService.getConfigs().pipe(
        map(resp=>resp.data),
        finalize(()=>console.log("as"))
    ).subscribe(configs => {
      this.configs = configs;
      this.setFormData();
    });
  }

  setFormData(){
    this.configForm.patchValue({
      'weekend': this.configs.weekend,
      'daysBefore': this.configs.daysBefore,
      'time': this.configs.time
    });
    this.configForm.disable();
  }

  submitForm(){
    this.configService.updateConfigs(this.configForm.value).pipe(
        finalize(()=>{
          this.loadData();
          this.editable = false;
        })
    ).subscribe();
  }

  onEdit(){
    this.configForm.enable();
    this.editable = true;
  }

  onCancel(){
    this.setFormData();
    this.editable = false;
  }
}
