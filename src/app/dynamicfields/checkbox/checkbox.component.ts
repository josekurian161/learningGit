import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/Models/field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  template: `
  <div class="inputField">

  <div  [formGroup]="group" >
  <div *ngFor="let opt of field.options">
  <mat-checkbox matInput value="opt.key" (click)="getdata(opt)"  [checked]="opt.checked"  >{{opt.label}}</mat-checkbox>
  </div>
  </div>
  </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() {

  }
  getdata(data)
  {
  }
 

}
