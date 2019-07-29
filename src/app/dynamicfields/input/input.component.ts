import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FieldConfig} from '../../Models/field.interface';

@Component({
  selector: 'app-input',
  template: `
  <div class="inputField"  [formGroup]="group">
  <h4>{{field.label}}:</h4> 
  <mat-form-field class="demo-full-width">
  <input matInput [formControlName]="field.name" placeholder="Answer" [type]="field.inputType">
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
  </mat-form-field>
  </div>
  `,
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
