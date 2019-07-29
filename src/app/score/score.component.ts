import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuditService } from '../services/audit.service';
import { LeadScoreAuditAssessmentList_ } from '../Models/common';
import { Score, ScoreAns } from '../Models/models';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service'
import { Router } from '@angular/router';
export interface scoreModel {
  s_QueCode: string
  s_Question: string;
  LeadScoreAuditAssessmentDetail: string[];
  ScoreInput: string;
  s_FullDescription:string;
}
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit {

  score: FormGroup;
  header: [];
  globalData:[];
  showProgress: boolean;
  ShowButton:boolean;
  publicDeals: scoreModel[] = [];
  ScoreAns: ScoreAns[] = [];
  constructor(private fb: FormBuilder,
    private service: AuditService,
    public CommonService: CommonService,
    private _route: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem("selectedAuditForscore")) {
      this._route.navigate(['dashboard']);
    }
    this.showProgress = true;
    this.ShowButton=true;
    this.bindcontrol();
    LeadScoreAuditAssessmentList_.s_AuditCode = sessionStorage.getItem("selectedAuditForscore");
    LeadScoreAuditAssessmentList_.s_PlantCode = sessionStorage.getItem("selectedplantForscore")
    this.service.getscore(LeadScoreAuditAssessmentList_).subscribe(
      data => {
        if (data.ResponseCode == "00") {
          this.globalData=data.ResponseData;
          this.bindheader(data.ResponseData);
          this.BindControlArray(data.ResponseData)
          this.BindDataValue(data.ResponseData)
          
          this.showProgress = false;

        }
      }
    )

  }

 
  // clear()
  // {
  //   this.publicDeals = [];
    
  //   for(var i=0;i<this.getmultirow.controls.length;i++)
  //   {
  //     this.publicDeals.push(this.getValueFromAddForm(this.globalData[i]));
  //   }
  //   this.getmultirow.setValue(this.publicDeals);
  //   this.publicDeals = [];
  // }

  cancel()
  {
    this._route.navigate(['dashboard']);
  }
  bindheader(data) {
    this.header = data[0].LeadScoreAuditAssessmentDetail;
  }
  BindControlArray(data) {
    for (var i = 0; i < data.length - 1; i++) {
      this.getmultirow.push(this.bindRow())
    }
  }
  BindDataValue(data) {
    
    this.publicDeals = [];
    if(data[0].s_Flag=="True")
    {
      this.ShowButton=false;
    }
    for (var i = 0; i < data.length; i++) {
      
      this.publicDeals.push(this.getValueFromAddForm(data[i]));
    }
    this.getmultirow.setValue(this.publicDeals);
  }
  getValueFromAddForm(formValue: any): scoreModel {
    debugger;
    const resultEntry: scoreModel = {} as scoreModel;
    resultEntry.s_Question = formValue.s_Question;
    resultEntry.s_QueCode = formValue.s_QueCode;
    resultEntry.LeadScoreAuditAssessmentDetail = formValue.LeadScoreAuditAssessmentDetail;
    var count=formValue.LeadScoreAuditAssessmentDetail.filter(x=>x.s_Score !== 'NA')
    if(formValue.s_Flag=="True")
    {
      resultEntry.ScoreInput = formValue.LeadScoreAuditAssessmentDetail[0].s_Finalscore;
    }
    else  if(count.length==0)
    {
      resultEntry.ScoreInput = 'NA';
    }
    else
    {
      resultEntry.ScoreInput = null;
      
    }
 
    return resultEntry;
  }

  bindcontrol() {
    this.score = this.fb.group({
      multiRow: this.fb.array([this.bindRow()])
    })
  }
  get getmultirow() {
    return <FormArray>this.score.get('multiRow');
  }
  submit() {
    if (this.score.valid) {
       
      var data = this.getData(this.score.value);
      this.service.InsertUpdateScoreAssesment(data).subscribe(data => {
        this.ScoreAns = [];
        if (data.ResponseCode == "00") {
          Swal.fire('Successfully saved!', 'success')
          this.ngOnInit();
        }
      })
    }
  }
  getData(formValue: any): Score {

    const resultEntry: Score = {} as Score;
    resultEntry.s_AuditCode = sessionStorage.getItem("selectedAuditForscore");
    resultEntry.s_PlantCode = sessionStorage.getItem("selectedplantForscore");
    resultEntry.s_CreatedBy = this.CommonService.getEmployeeCode();
    for (var i = 0; i < formValue.multiRow.length; i++) {
      this.ScoreAns.push(this.getAnsData(formValue.multiRow[i]))
    }
    resultEntry.s_ScoreDataJson = this.ScoreAns;
    return resultEntry;
  }
  getAnsData(data: any): ScoreAns {
    const data_: ScoreAns = {} as ScoreAns;
    data_.s_QuestionCode = data.s_QueCode
    data_.n_FinalScore = data.ScoreInput
    return data_;
    
  }
  bindRow() {
    return this.fb.group(
      {
        s_QueCode: [null],
        s_Question: [null],
        LeadScoreAuditAssessmentDetail: [null],
        ScoreInput: [null]
      }
    )
  }
}
