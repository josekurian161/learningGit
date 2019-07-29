import { Component, OnInit } from '@angular/core';
import { PendingAuditForApproval } from '../../Models/common';
import { AuditService } from '../../services/audit.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ImagePopupComponent } from 'src/app/image-popup/image-popup.component';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-approve',
  templateUrl: './lead-approve.component.html',
  styleUrls: ['./lead-approve.component.css']
})
export class LeadApproveComponent implements OnInit {

  pendingReview: FormGroup;
  publicDeals: any[] = [];
  Norecord: boolean;
  question: string
  finalScore: string
  showProgress: boolean = true;
  ActivateIndex: number[] = [];
  constructor(private _route: Router, private AuditService: AuditService, private fb: FormBuilder, public dialog: MatDialog, public CommonService: CommonService) { }

  ngOnInit() {
    this.Norecord = true;
    this.BindValue();

    if (!sessionStorage.getItem("LeadRemark_questionCode")) {
      this._route.navigate(['dashboard']);
    }
    if (!sessionStorage.getItem("LeadRemark_s_AuditCode")) {
      this._route.navigate(['dashboard']);
    }
    var i = sessionStorage.getItem('LeadRemark_questionCode');
    PendingAuditForApproval.s_ActionType = "SearchbyQueCodeLead",
      PendingAuditForApproval.s_AuditCode = sessionStorage.getItem("LeadRemark_s_AuditCode"),
      PendingAuditForApproval.s_PlantCode = sessionStorage.getItem("LeadRemark_s_PlantCode"),
      PendingAuditForApproval.s_QueCode = i

    this.AuditService.PendingAuditForApproval_(PendingAuditForApproval).subscribe(
      data => {
        
        this.showProgress = false;
        if (data.ResponseCode == '00') {
          if (data.ResponseData[0].AuditScoreDetail.length > 0) {
            this.question = data.ResponseData[0].s_Question;
            this.finalScore = data.ResponseData[0].n_FinalScore;
            this.BindControlArray(data.ResponseData[0].AuditScoreDetail);
            this.BindDataValue(data.ResponseData);
            this.Norecord = false;
          }
          else  if (data.ResponseCode == '00'){
            sessionStorage.removeItem('LeadRemark_questionCode');
            this._route.navigate(['LeadQuesList']);
            this.Norecord = true;
          }
       
        }
        else
        {
          sessionStorage.removeItem('LeadRemark_questionCode');
          this._route.navigate(['LeadQuesList']);
          this.Norecord = true;
        }
      }

    );
  }
  BindControlArray(data) {
    for (var i = 0; i < data.length - 1; i++) {
      this.getmultipleQuesControl.push(this.bindValueArray())
    }
  }
  BindDataValue(data) {
    this.publicDeals = [];
    this.pendingReview.controls['s_QueCode'].setValue(data[0].s_QueCode);
    this.pendingReview.controls['s_Question'].setValue(data[0].s_Question);
    for (var i = 0; i < data[0].AuditScoreDetail.length; i++) {
      this.publicDeals.push(this.getValueFromAddForm(data[0].AuditScoreDetail[i]));
    }

    this.getmultipleQuesControl.setValue(this.publicDeals);
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
    resultEntry.s_AnswerOption=formValue.s_AnswerOption;
    resultEntry.s_Observation=formValue.s_Observation;
    resultEntry.s_Suggestion=formValue.s_Suggestion;
    resultEntry.d_PerformedDate=formValue.d_PerformedDate;
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
  openDialog(data): void {
  if(data.substring(data.lastIndexOf('.') + 1).toLowerCase()=="mp3")
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = data;
      let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
    else if(data.substring(data.lastIndexOf('.') + 1).toLowerCase()=="pdf")
    { 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = data;
      let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
    else if (data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'JPEG' || data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'jpg' || data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'png') 
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = data;
      let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
    else{
      window.open(data);
    }
    
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
        d_PerformedDate:[null],
        remark: [null, Validators.required]
      }
    )
  }


  getdate(mainValue, data) {
    if (data == 'Approve') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Approve it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          var data_ = this.formValue(mainValue.value, data)
          this.AuditService.InsertUpdateObservationLog_(data_).subscribe(

            data => {

              if (data.ResponseCode == "00") {
                this.ngOnInit();
                Swal.fire(
                  'Approved !',
                  'Your request has been Approved.',
                  'success'
                )
              }
            }
          )


        } else if (

          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {


          Swal.fire(
            'Cancelled',
            'Your request has been canceled.:)',
            'error'
          )
        }
      })
    }
    else if (data == 'Reject') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          var data_ = this.formValue(mainValue.value, data)
          this.AuditService.InsertUpdateObservationLog_(data_).subscribe(
            data => {

              if (data.ResponseCode == "00") {
                this.ngOnInit();
                Swal.fire(
                  'Rejected !',
                  'Your request has been Successfully Rejected.',
                  'success'
                )
              }
            }
          )


        } else if (

          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {


          Swal.fire(
            'Cancelled',
            'Your request has been canceled.:)',
            'error'
          )
        }
      })
    }

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
  Cancel() {
    sessionStorage.removeItem("LeadRemark_questionCode")
    this._route.navigate(["LeadQuesList"]);
  }
  formValue(data, value) {
    const formData: any = {} as any;
    formData.s_AuditDetailCode = data.s_AuditDetailCode;
    formData.s_AuditCode = sessionStorage.getItem("LeadRemark_s_AuditCode");
    formData.s_Observation = data.remark;
    formData.d_LogDate = new Date();
    formData.s_Action = value;
    formData.s_Role = '';
    formData.s_EmpCode = this.CommonService.getEmployeeCode();
    formData.s_ActionType = "InsertLead";
    return formData

  }
}
