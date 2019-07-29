import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../Models/field.interface';
@Component({
  selector: 'app-radiobutton',
  template: `
  <div [formGroup]="group" class="radioBox"> 
  <h4>{{field.label}}: <button class="btnInfoTooltip"  *ngIf="ShowIbutton"
  matTooltip="{{tooltipData}}" data-html="true"
  aria-label="Button that displays a tooltip when focused or hovered over">
  i
</button></h4>
  <mat-radio-group [formControlName]="field.name">
  <mat-radio-button *ngFor="let item of field.options"  (change)="Selectedvalue($event,item)" [value]="item.s_Answercode"> <span class="wrap-mat-radio-label">{{item.s_AnswerOption}}</span> &nbsp; </mat-radio-button>
  </mat-radio-group> 
  </div>
  `,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  ShowIbutton
  tooltipData
  constructor() { }

  ngOnInit() {
    
    console.log(this.field.value)
    if (this.field.value) {
      var data = this.field.options.filter(data => data.s_Answercode == this.field.value)
      this.Selectedvalue(data, data[0])
    }

  }
  Selectedvalue(data, description) {
    debugger;
    this.ShowIbutton = true;
     var i=description.s_FullDescription;
    var tooltip_ =i.replace('&#013;','\n');
    this.tooltipData = tooltip_;
  }
}
