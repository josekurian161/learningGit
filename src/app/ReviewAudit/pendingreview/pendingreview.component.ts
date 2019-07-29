import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PendingAuditForApproval } from '../../Models/common';
import { AuditService } from '../../services/audit.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ImagePopupComponent } from 'src/app/image-popup/image-popup.component';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pendingreview',
  templateUrl: './pendingreview.component.html',
  styleUrls: ['./pendingreview.component.css']
})
export class PendingreviewComponent implements OnInit {
  @ViewChild('RefInput')
  RefInput: ElementRef;
  pendingReview: FormGroup;
  publicDeals: any[] = [];
  showProgress = false;
  Norecord: boolean;
  ActivateIndex: number[] = [];
  question: string
  finalScore: string
  dataUrl
  constructor(private _route: Router, private AuditService: AuditService, private fb: FormBuilder, public dialog: MatDialog, public CommonService: CommonService) { }

  ngOnInit() {
    this.Norecord = true;
    if (!sessionStorage.getItem("questionCodeRemark")) {
      this._route.navigate(['dashboard']);
    }
    if (!sessionStorage.getItem("AuditRemark_s_AuditCode")) {
      this._route.navigate(['dashboard']);
    }
    this.showProgress = true;
    this.BindValue();
    var i = sessionStorage.getItem('questionCodeRemark');
    PendingAuditForApproval.s_ActionType = "SearchbyQueCode",
      PendingAuditForApproval.s_AuditCode = sessionStorage.getItem("AuditRemark_s_AuditCode"),
      PendingAuditForApproval.s_PlantCode = sessionStorage.getItem("AuditRemark_s_PlantCode"),
      PendingAuditForApproval.s_QueCode = i

    this.AuditService.PendingAuditForApproval_(PendingAuditForApproval).subscribe(
      data => {
        
        this.showProgress = false;
        console.log(data)
        if (data.ResponseCode == '00') {

          if (data.ResponseData[0].AuditScoreDetail.length > 0) {
            console.log(data);

            this.question = data.ResponseData[0].s_Question;
            this.finalScore = data.ResponseData[0].n_FinalScore;
            this.BindControlArray(data.ResponseData[0].AuditScoreDetail);
            this.BindDataValue(data.ResponseData);
            this.Norecord = false;
          }
          else {
            this.Norecord = true;
            sessionStorage.removeItem('questionCodeRemark');
            this._route.navigate(['ReviewQuestionList']);
          }

          this.showProgress = false;
        }
        else {
          sessionStorage.removeItem('questionCodeRemark');
          this._route.navigate(['ReviewQuestionList']);
        }
      }

    );
  }
  Cancel() {
    sessionStorage.removeItem("questionCodeRemark")
    this._route.navigate(["ReviewQuestionList"]);
  }
  toogel(data, value) {

    if (value > 0) {
      if (this.ActivateIndex.includes(data)) {
        this.ActivateIndex = this.ActivateIndex.filter(item => item !== data);
        console.log(this.ActivateIndex);
      }
      else {
        this.ActivateIndex.push(data);
        console.log(this.ActivateIndex);
      }
    }

  }
  BindControlArray(data) {
    for (var i = 0; i < data.length - 1; i++) {
      this.getmultipleQuesControl.push(this.bindValueArray())
    }
  }
  BindDataValue(data) {
    this.publicDeals = [];
    console.log(data[0].s_QueCode);
    this.pendingReview.controls['s_QueCode'].setValue(data[0].s_QueCode);
    this.pendingReview.controls['s_Question'].setValue(data[0].s_Question);
    console.log(data[0].AuditScoreDetail);
    console.log(data[0].AuditScoreDetail.length);
    for (var i = 0; i < data[0].AuditScoreDetail.length; i++) {
      this.publicDeals.push(this.getValueFromAddForm(data[0].AuditScoreDetail[i]));
    }

    this.getmultipleQuesControl.setValue(this.publicDeals);
    console.log(this.publicDeals);
  }
  getValueFromAddForm(formValue: any): {} {

    const resultEntry: any = {} as any;
    resultEntry.s_AudioPath = formValue.s_AudioPath;
    resultEntry.s_ImagePath = formValue.s_ImagePath;
    resultEntry.s_ScoreNo = formValue.s_ScoreNo;
    resultEntry.s_QueCode = formValue.s_QueCode;
    resultEntry.s_AnsCode = formValue.s_AnsCode;
    resultEntry.s_AnsValue = formValue.s_AnsValue;
    resultEntry.s_EmployeeCode = formValue.s_EmployeeCode;
    resultEntry.s_EmployeeName = formValue.s_EmployeeName;
    resultEntry.s_AuditDetailCode = formValue.s_AuditDetailCode;
    resultEntry.Observation = formValue.Observation;
    resultEntry.s_AnswerOption = formValue.s_AnswerOption;
    resultEntry.s_Observation = formValue.s_Observation;
    resultEntry.s_Suggestion = formValue.s_Suggestion;
    resultEntry.imageRemark = null;
    resultEntry.audioRemark = null;
    resultEntry.audioBinary = null;
    resultEntry.d_PerformedDate = formValue.d_PerformedDate;
    resultEntry.remark = null;
    return resultEntry;
  }


  get getmultipleQuesControl() {
    return <FormArray>this.pendingReview.get('multipendingReview');
  }
  BindValue() {
    this.pendingReview = this.fb.group({
      s_QueCode: [null, Validators.required],
      s_Question: [null, Validators.required],
      multipendingReview: this.fb.array([this.bindValueArray()])
    })

  }
  openDialog(value): void {

    console.log(value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = value;
    let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  bindValueArray() {
    return this.fb.group(
      {
        s_AudioPath: [null],
        s_ImagePath: [null],
        s_ScoreNo: [null],
        s_QueCode: [null],
        s_AnsCode: [null],
        s_AnsValue: [null],
        s_EmployeeCode: [null],
        s_EmployeeName: [null],
        s_AuditDetailCode: [null],
        Observation: [null],
        s_AnswerOption: [null],
        s_Observation: [null],
        s_Suggestion: [null],
        d_PerformedDate: [null],
        imageRemark: [null],
        audioRemark: [null],
        audioBinary: [null],
        remark: [null, Validators.required]
      }
    )
  }
  onSelectFileAudio(event, field, i) {
    
    if (event.target.files && event.target.files[0]) {
      var Extension = event.target.files[0].name.substring(
        event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
      if (Extension == 'mp3') {
        const file = event.target.files[0];
        this.dataUrl = URL.createObjectURL(file);
        const file1 = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          let target: any = event.target;
          this.getmultipleQuesControl.controls[i].get('audioBinary').setValue(target.result);
        }
        this.getmultipleQuesControl.controls[i].get('audioRemark').setValue(file);
      }
      else {
        Swal.fire('Oops...', 'Upload only mp3 files!', 'error')
      }
      this.RefInput.nativeElement.value = "";
    }

  }
  onSelectDocfile(event, field, i) {
   
    if (event.target.files && event.target.files[0]) {
      var Extension = event.target.files[0].name.substring(
        event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
      const file = event.target.files[0];
      this.getmultipleQuesControl.controls[i].get('imageRemark').setValue(file);
    }
    this.RefInput.nativeElement.value = "";
  }
  getdate_1(dataUrl) {
    
    var file_ = URL.createObjectURL(dataUrl);
    window.open(file_);
  }
  remove(i)
  {
    
    this.getmultipleQuesControl.controls[i].get('audioRemark').setValue(null);
    this.getmultipleQuesControl.controls[i].get('audioBinary').setValue(null);
    this.RefInput.nativeElement.value = "";
  }
  getdate(data) {
    this.showProgress=true;
    var dataAudio = data.value.audioRemark;
    var dataFile = data.value.imageRemark;
    if (dataAudio) {

    }
    if (dataFile) {
      var check = data.value.imageRemark.name.split('.').pop();
    }

    var data_q = this.formValue(data.value)
    this.AuditService.InsertUpdateObservationLog_(data_q).subscribe(
      data_ => {
        
        if (data_.ResponseCode == "00") {
          var flagchaek = 0;
          const formData = new FormData();
          if (dataAudio) {
            console.log(`${data_.ResponseData[0].s_pkLogid}-audio.mp3`);
            formData.append('Voice', dataAudio, `${data_.ResponseData[0].s_pkLogid}-audio.mp3`);
            flagchaek = 1;
          }
          if (dataFile) {
            console.log(`${data_.ResponseData[0].s_pkLogid}-file.${check}`);
            formData.append('file', dataFile, `${data_.ResponseData[0].s_pkLogid}-file.${check}`);
            flagchaek = 1;
          }
          if (flagchaek == 1) {
            this.AuditService.InsertObservationlog_file_(formData).subscribe(data => {
              
              this.ngOnInit();
              Swal.fire("Successfully Saved", "success")
              this.showProgress = false;
            });
          }
        
        }
        else {
          this.Norecord = true;
        }
      }
    )


  }

  formValue(data) {
    const formData: any = {} as any;
    formData.s_AuditDetailCode = data.s_AuditDetailCode;
    formData.s_AuditCode = sessionStorage.getItem("AuditRemark_s_AuditCode");
    formData.s_Observation = data.remark;
    formData.d_LogDate = new Date();
    formData.s_Action = 'Complete';
    formData.s_Role = '';
    formData.s_EmpCode = this.CommonService.getEmployeeCode();
    formData.s_ActionType = "InsertQH";
    return formData

  }

}
