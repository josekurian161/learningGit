import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../Models/field.interface";
@Component({
  selector: 'app-questionselect',
  template: `
  <li>
  <mat-form-field class="demo-full-width margin-top" [formGroup]="group">
  <mat-select [placeholder]="field.label" [formControlName]="field.name"  (selectionChange)="Selectedvalue($event.value,field.options)" >
  <mat-option *ngFor="let item of field.options"  [value]="item.s_Answercode"><span class="wrap-mat-radio-label">{{item.s_AnswerOption}}</span></mat-option>
  </mat-select>
  </mat-form-field>
  <div *ngIf="ShowIbutton">
  <button class="btnInfoTooltip" 
  matTooltip="{{tooltipData}}"
  aria-label="Button that displays a tooltip when focused or hovered over">
  i
</button>
  </div>
 
  
  </li>
  `,
  styles: []
})
export class QuestionselectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  ShowIbutton
  tooltipData
  constructor() { }

  ngOnInit() {
    
    console.log(this.field.value)
    if(this.field.value)
    {
      
      this.Selectedvalue(this.field.value,this.field.options)
    }
  }
  Selectedvalue(data,option)
  {
    var data = option.filter(items => items.s_Answercode == data);
    this.ShowIbutton=true;
    var i=data[0].s_FullDescription;
    var tooltip_ =i.replace('&#013;','\n');
    this.tooltipData=tooltip_;
  }

}
