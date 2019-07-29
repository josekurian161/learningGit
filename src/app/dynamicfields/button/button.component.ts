import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../Models/field.interface';
import { MatDialogRef } from '@angular/material';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
import { CommonService } from '../../services/common.service'
@Component({
  selector: 'app-button',
  template: `
  <li>
  <mat-dialog-actions fxLayoutWrap="wrap" fxLayout fxLayoutAlign="end" [formGroup]="group">
  <button  mat-button mat-flat-button type="button" [disabled]="BtnAuditDisableStatus"  (click)="close()" class="button"  >Cancel</button> 
  <button (type)="field.name" id="submitButton"  [disabled]="BtnAuditDisableStatus" name="btn_Submit"  *ngIf="field.value=='Pending'"    mat-button mat-flat-button color="primary">{{field.label}}</button>
</mat-dialog-actions> 
</li>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  BtnAuditDisableStatus: boolean;
  constructor(private dialogRef: MatDialogRef<MyDialogComponent>, private CommonService: CommonService) { }

  ngOnInit() {
    this.CommonService.getAuditButtonStatus('');
    this.BtnAuditDisableStatus = false;
    this.CommonService.cast.subscribe(interactAuditId => {
      debugger;
      if (interactAuditId == '') {
        this.BtnAuditDisableStatus = false;
      }
      else {
        this.BtnAuditDisableStatus = true;
      }
      debugger;
    });
  }
  close() {
    this.dialogRef.close();
  }

}
