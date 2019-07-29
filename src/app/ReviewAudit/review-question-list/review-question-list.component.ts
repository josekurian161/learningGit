import { Component, OnInit } from '@angular/core';
import {AuditService } from '../../services/audit.service'
import { PendingAuditForApproval } from '../../Models/common';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms'
import { AuditQuestion } from '../../Models/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review-question-list',
  templateUrl: './review-question-list.component.html',
  styleUrls: ['./review-question-list.component.css']
})
export class ReviewQuestionListComponent implements OnInit {
  publicDeals:any[]= [];
  showProgress:boolean=true;
  constructor(private AuditService:AuditService,
    private fb: FormBuilder,
    private _route:Router) { }
    AuditQuestions: FormGroup;
    AuditName
    Norecord:boolean;

  ngOnInit() {
    if (!sessionStorage.getItem("AuditRemark_s_AuditCode")) {
      this._route.navigate(['dashboard']);
    }
    this.AuditName=sessionStorage.getItem('AuditRemark_s_AuditName');
    this.BindControl()
    PendingAuditForApproval.s_ActionType="Select",
    PendingAuditForApproval.s_AuditCode=sessionStorage.getItem("AuditRemark_s_AuditCode"),
    PendingAuditForApproval.s_PlantCode=sessionStorage.getItem("AuditRemark_s_PlantCode"),
    PendingAuditForApproval.s_QueCode="",

    this.AuditService.PendingAuditForApproval_(PendingAuditForApproval).subscribe(
      data=>
      {
         this.showProgress=false;
        if (data.ResponseCode == '00') {
          this.BindControlArray(data.ResponseData)
          this.BindDataValue(data.ResponseData)
        }
        else if (data.ResponseCode == '04')
        {
          this.Norecord = true;
        }
      }
   
    );
  }
  get getmultipleQuesControl() {
    return <FormArray>this.AuditQuestions.get('multipleQues');
  }
  BindControlArray(data){
    for (var i = 0; i < data.length - 1; i++) {
      this.getmultipleQuesControl.push(this.bindquestionArray())
    }
  }
  BindDataValue(data){
    this.publicDeals = [];
    for (var i = 0; i < data.length; i++) {
      this.publicDeals.push(this.getValueFromAddForm(data[i]));
    }

    this.getmultipleQuesControl.setValue(this.publicDeals);
  }
  getValueFromAddForm(formValue: any): {} {
    const resultEntry: any = {} as any;
    resultEntry.s_Question = formValue.s_Question;
    resultEntry.s_QueCode = formValue.s_QueCode;
    return resultEntry;
  }
  getQuesDetail(data)
  {
    sessionStorage.setItem("questionCodeRemark",data);
    this._route.navigate(['Pendingreview']);
  }
  BindControl() {
    this.AuditQuestions = this.fb.group(
      {
        multipleQues: this.fb.array([this.bindquestionArray()])
      }
    )
  }
  Cancel()
  {
    this._route.navigate(["dashboard"]);
  }
  bindquestionArray() {
    return this.fb.group(
      {
        s_Question: [null, Validators.required],
        s_QueCode: [null, Validators.required],
      }
    )
  }

}
