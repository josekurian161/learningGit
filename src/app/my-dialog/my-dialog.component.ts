import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FieldConfig } from "../Models/field.interface";
import { InsertAuditDetailList } from "../Models/models";
import { DynamicFormComponent } from "../dynamicfields/dynamic-form/dynamic-form.component";
import { AuditService } from "../services/audit.service"
import { CommonService } from "../services/common.service"
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  showProgress = false;
  question
  regConfig: FieldConfig[]
  constructor(
    public datepipe: DatePipe,
    private fb: FormBuilder,
    public AuditService: AuditService,
    private dialogRef: MatDialogRef<MyDialogComponent>,
    private CommonService: CommonService,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data);
      console.log(data[9].label)
     this.question=data[9].label;
    
    this.regConfig = data
  }

  ngOnInit() {
  }
  submit(value: any) {
    this.showProgress = false;

    this.showProgress = true;
    var data = this.formData(value);
    this.AuditService.InsertQuestionAnswer([data]).subscribe(data => {
    
      if (data.ResponseCode == "00") {
        if (data.ResponseData) {
          var Check=false;
          const formData = new FormData();
          if(value.updatedImageSatus==1)
          {
            formData.append('image', value["image"], `${data.ResponseData[0].s_AuditDetailCode}-jdjd.jpg`)
            Check=true
          }
          if(value.updatedVoiceSatus==1)
          {
            formData.append('Voice', value["voice"], `${data.ResponseData[0].s_AuditDetailCode}-jdjd.mp3`)
            Check=true
          }
          if(Check)
          {
            this.AuditService.InsertAuditfileList(formData).subscribe(data => {
              this.showProgress = false;
              this.dialogRef.close(value);
              this.CommonService.getAuditButtonStatus('disable');
            }
            );
          }
          else{
            this.showProgress = false;
            this.dialogRef.close(value);
            this.CommonService.getAuditButtonStatus('disable');
          }
         
        }
      }
      else {
        Swal.fire('Oops...', 'Something went wrong!', 'error')
      }



    }
    );


  }

  formData(value: any): InsertAuditDetailList {
    
    console.log(value);
    //var getScore = this.regConfig[6].options.find(s => s.s_ScoreID == value.score);
    const InsertAuditDetailList: InsertAuditDetailList = {} as InsertAuditDetailList
    InsertAuditDetailList.s_AuditCode = sessionStorage.getItem('selectedAudit_');

    if (value.ControlType == "TextBox") {
      InsertAuditDetailList.s_AnsValue = value.AnsCode;
      InsertAuditDetailList.s_AnsCode = this.regConfig[10].options[0].s_Answercode;
    }
    else {
      InsertAuditDetailList.s_AnsValue = null;
      InsertAuditDetailList.s_AnsCode = value.AnsCode;
    }
   // InsertAuditDetailList.s_ScoreNo = getScore.s_ScoreNo;
    InsertAuditDetailList.s_PlantCode = this.regConfig[0].value;
    // InsertAuditDetailList.n_QueationMapId = value.score;
    InsertAuditDetailList.s_CreatedBy = this.CommonService.getEmployeeCode();
    InsertAuditDetailList.s_QueCode=value.questionCode;
    InsertAuditDetailList.s_Observation=value.s_Observation;
    InsertAuditDetailList.s_Suggestion=value.s_Suggestion;
    InsertAuditDetailList.d_PerformedDate=this.datepipe.transform(value.d_PerformedDate, 'yyyy-MM-dd');
    return InsertAuditDetailList

  }
}
