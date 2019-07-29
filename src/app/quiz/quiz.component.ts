import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { AuditService } from '../services/audit.service'
import { CommonService } from '../services/common.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { RootObject, AuditQuestion, ResponseData, Template, InsertUpdateAuditStatus } from '../Models/models'
import { CommonControls, getDataForControls } from '../Models/field.interface'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface questiondata {
  s_Question: string;
  s_QueCode: string;
  s_AnswerType: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  publicDeals: questiondata[] = [];

  private quiz: Template
  AuditQuestions: FormGroup;
  GlobalData: ResponseData;
  btnStatus: boolean = false;
  showProgress: boolean = true;
  Auditname;
  totalCount=0;
  totalAns=0;

  constructor(private fb: FormBuilder,
    private AuditService: AuditService,
    public dialog: MatDialog,
    public CommonService: CommonService,
    public route_: Router) { }
  ngOnInit() {
    this.BindControl()
    if (sessionStorage.getItem('selectedAudit_')) {
      this.quiz = this.FormValue();
      var TemplateData = this.CommonService.getTemplateData();
      this.AuditService.fetchData(this.quiz).subscribe(
        data => {
          this.showProgress = false;
          this.btnStatus = true;
          if ((<RootObject>data).ResponseCode == '00') {
            this.GlobalData = (<RootObject>data).ResponseData[0];
            this.Auditname  = (<RootObject>data).ResponseData[0].s_TemplateName;
            this.BindControlArray((<RootObject>data).ResponseData[0])
            this.BindDataValue((<RootObject>data).ResponseData[0])
          }
        }
      );
    }
    else {
      this.route_.navigate(["dashboard"])
    }
  }
  FormValue(): Template {
    const quiz: Template = {} as Template;
    quiz.ActionType = "Select";
    quiz.s_AuditCode = sessionStorage.getItem('selectedAudit_');
    quiz.s_EmployeeCode = this.CommonService.getEmployeeCode();
    return quiz;

  }
  BindControlArray(data) {
    for (var i = 0; i < data.AuditQuestion.length - 1; i++) {
      this.getmultipleQuesControl.push(this.bindquestionArray())
    }

  }
  BindControl() {
    this.AuditQuestions = this.fb.group(
      {
        multipleQues: this.fb.array([this.bindquestionArray()])
      }
    )
  }
  submitValue() {

    var data = this.Finalsubmit();
    this.AuditService.InsertUpdateAuditStatus_(data).subscribe(data => {
      if (data.ResponseCode == "00") {
       this.totalCount=0;
  this.totalAns=0;
        this.fetchData();
        Swal.fire('Successfully saved!', 'success')
      }
    })
  }
  Cancel() {
    this.route_.navigate(["dashboard"]);
  }
  fetchData() {
    this.AuditService.fetchData(this.quiz).subscribe(
      data => {

        if ((<RootObject>data).ResponseCode == '00') {
          this.GlobalData = (<RootObject>data).ResponseData[0];
          this.BindDataValue((<RootObject>data).ResponseData[0])
        }
      }
    )
  }
  Finalsubmit(): InsertUpdateAuditStatus {

    const resultEntry: InsertUpdateAuditStatus = {} as InsertUpdateAuditStatus;
    resultEntry.ActionType = "Select";
    resultEntry.s_AuditCode = sessionStorage.getItem('selectedAudit_');
    resultEntry.s_PlantCode = sessionStorage.getItem('selectedAudit_Plant');
    resultEntry.s_Value = "Completed";
    resultEntry.s_EmployeeCode = this.CommonService.getEmployeeCode();
    return resultEntry;
  }

  BindDataValue(data) {
    if (data.s_Status == "Pending") {
      this.btnStatus = false;
    }
    else {
      this.btnStatus = true;
    }

    this.publicDeals = [];
    for (var i = 0; i < data.AuditQuestion.length; i++) {
      this.publicDeals.push(this.getValueFromAddForm(data.AuditQuestion[i]));
    }

    this.getmultipleQuesControl.setValue(this.publicDeals);

  }

  getValueFromAddForm(formValue: any): AuditQuestion {

if(formValue.b_IsAnswered==true)
{
this.totalAns+=1;
}

  this.totalCount+=1;
    const resultEntry: AuditQuestion = {} as AuditQuestion;
    resultEntry.s_Question = formValue.s_Question;
    resultEntry.s_QueCode = formValue.s_QueCode;
    resultEntry.s_AnswerType = formValue.s_AnswerType;
    resultEntry.b_IsAnswered=formValue.b_IsAnswered;
    return resultEntry;
  }

  bindquestionArray() {
    return this.fb.group(
      {
        s_Question: [null, Validators.required],
        s_QueCode: [null, Validators.required],
        s_AnswerType: [null, Validators.required],
        b_IsAnswered:[null]
      }
    )
  }
  get getmultipleQuesControl() {
    return <FormArray>this.AuditQuestions.get('multipleQues');
  }

  openDialog(value): void {
    var data = this.GlobalData.AuditQuestion.filter(items => items.s_QueCode == value);
    var formDataForRegistration = this.formDataForRegistration(data, this.GlobalData.s_Status)
    console.log(formDataForRegistration);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = formDataForRegistration;
    dialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
     this.totalCount=0;
     this.totalAns=0;
      this.fetchData();
    });
  }


  formDataForRegistration(data, status): any[] {

    var array = [] as any[]
    array.push(CommonControls('PlantCode', data, status))
    array.push(CommonControls('ControlType', data, status))
    array.push(CommonControls('voiceControl', data, status))
    array.push(CommonControls('questionCode', data, status))
    array.push(CommonControls('imageControl', data, status))
    array.push(CommonControls('image', data, status))
    // array.push(CommonControls('scoreControl', data, status))
    array.push(CommonControls('updatedImageSatus', data, status))
    array.push(CommonControls('updatedVoiceSatus', data, status))
    array.push(CommonControls('VoiceUrl', data, status))
    array.push(getDataForControls(data))
    array.push(CommonControls('ObsTextBox',data,status))
    array.push(CommonControls('ActionSugg',data,status))
    array.push(CommonControls('Date',data,status))
    
    // array.push(CommonControls('CheckBox', data))

    array.push(CommonControls('submitControl', data, status))
    return array;
  }

}