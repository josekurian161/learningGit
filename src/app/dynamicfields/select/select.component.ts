import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../Models/field.interface";
@Component({
  selector: 'app-select',
  template: `
  <div class="selectBox">
  <mat-form-field class="demo-full-width margin-top" [formGroup]="group">
  <mat-select [placeholder]="field.label" [formControlName]="field.name">
  <mat-option *ngFor="let item of field.options" [value]="item.s_ScoreID">{{item.s_ScoreNo}}</mat-option>
  </mat-select>
  </mat-form-field>
  </div>
  `,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
