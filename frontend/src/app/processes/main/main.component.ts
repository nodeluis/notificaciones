import { Component, OnInit } from '@angular/core';
import {finalize, map} from "rxjs";
import {ProcessService} from "../../_core/services/process.service";
import {Process} from "../../_core/models/process.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProcessType} from "../../_core/models/processType.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent{
  constructor() {
  }
}
