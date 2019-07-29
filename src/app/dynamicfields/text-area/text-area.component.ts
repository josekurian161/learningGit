import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/Models/field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'text-area',
  template: `
  <div class="inputField"  [formGroup]="group">
  <h4>{{field.label}}:</h4> 
  <mat-form-field class="demo-full-width">
  <textarea matInput [formControlName]="field.name" maxlength="500" ></textarea>
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
  </mat-form-field>
  </div>
  `,
  styles: []
})
export class TextAreaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
