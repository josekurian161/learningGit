import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService } from '../services/audit.service';
import { CommonService } from '../services/common.service';
import { PendingAuditList, AuditInformationList } from '../Models/common'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-templateform',
  templateUrl: './templateform.component.html',
  styleUrls: ['./templateform.component.css']
})
export class TemplateformComponent implements OnInit {


  AuditSelect: FormGroup;
  showProgress = true;
  auditArray: any[];
  AuditInfoData: any;
  title: string;
  behaviorAuditId: string;
  d_FromDate: string;
  d_QMSCertificatioDate: string;
  d_QMSExpiryDate: string;
  d_RevisionDate: string;
  d_Todate: string;
  s_AuditCode: string;
  s_AuditUniqueCode: string;
  s_PlantName: string;
  s_ProductCode: string;
  s_TemplateName: string;
  AuditName: string;
  s_PlantHeadCode: string;
  s_PlantQualityHeadCode: string;
  MapEmployee: any[];
  IsLoading: boolean;
  displayInfo: boolean = false;
  label: string;
  placeholder: string;

  @Output()
  getDropdownChangeValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
    private AuditService: AuditService,
    private CommonService: CommonService,
    private _route: Router) { }

  ngOnInit() {

    if (!sessionStorage.getItem("status")) {
      this._route.navigate(['dashboard']);
    }
    this.AuditSelect = this.fb.group({
      seletAudit: ['', Validators.required]
    })
    if (sessionStorage.getItem("status") == "Score") {
      this.title = sessionStorage.getItem("statusname")
      PendingAuditList.ActionType = "SelectFoLead"
      this.label = "Get Score"
      this.placeholder = "Select Score";

    }
    else if (sessionStorage.getItem("status") == "Audittemplate") {
      this.title = sessionStorage.getItem("statusname")

      PendingAuditList.ActionType = "select"
      this.label = "Start Audit"
      this.placeholder = "Select Audit";
    }
    else if (sessionStorage.getItem("status") == "AuditComplete") {
      this.title = sessionStorage.getItem("statusname")

      PendingAuditList.ActionType = "SelectForAuditComplete"
      this.label = "Audit Complete"
      this.placeholder = "Select Audit"
    }
    else if (sessionStorage.getItem("status") == "AuditRemark") {
      this.title = sessionStorage.getItem("statusname")

      PendingAuditList.ActionType = "SelectFoQH"
      this.label = "Audit Review"
      this.placeholder = "Select Audit for Review";
    } else if (sessionStorage.getItem("status") == "LeadRemark") {

      this.title = sessionStorage.getItem("statusname")

      PendingAuditList.ActionType = "SelectFoQHApproveReject"
      this.label = "Lead Review"
      this.placeholder = "Select Audit for Review";

    }
    else if (sessionStorage.getItem("status") == "ScoreComplete") {
      this.title = sessionStorage.getItem("statusname")
      PendingAuditList.ActionType = "SelectCompleteScoreAssesment"
      this.label = "Score Complete"
      this.placeholder="Select Audit for Score";
    }
    else if (sessionStorage.getItem("status") == "ApprovedAudit") {
      this.title = sessionStorage.getItem("statusname")
      PendingAuditList.ActionType = "ApprovedAudit"
      this.label = "Approved Audit"
      this.placeholder="Select Audit to Approve";
    }

    PendingAuditList.s_EmployeeCode = this.CommonService.getEmployeeCode();
    this.AuditService.GetPendingAudit(PendingAuditList).subscribe(
      data => {

        if (data.ResponseCode == "00") {
          this.auditArray = data.ResponseData;
          if (this.auditArray.length == 1) {
            this.AuditSelect.setValue({
              seletAudit: this.auditArray[0]
            });
            this.Selectedvalue(this.auditArray[0])

          }

          this.showProgress = false;
        }
        else {
          this.auditArray = null;
          this.showProgress = false;
          // Swal.fire('Oops...', 'No record found', 'error')
        }
      }
    )
  }
  Selectedvalue(value) {

    this.IsLoading = true;
    this.displayInfo = false;
    console.log(value.s_AuditCode);
    // this.CommonService.cast.subscribe(interactAuditId=> {
    //   
    //   this.behaviorAuditId=interactAuditId})
    AuditInformationList.s_AuditCode = value.s_AuditCode;
    AuditInformationList.s_EmployeeCode = this.CommonService.getEmployeeCode();
    this.AuditService.AuditInformationList_(AuditInformationList).subscribe(data => {
      if (data.ResponseCode == "00") {

        this.bindAuditInfo(data.ResponseData[0], value.s_AuditName)
        this.IsLoading = false;
        this.displayInfo = true;
        // this.AuditInfoData = data.ResponseData[0];
      }
      console.log(data);

    })

    // this.CommonService.getValueForAudit(value.s_AuditCode);
    // this.getDropdownChangeValue.emit(value.s_AuditCode)
    // 
  }
  bindAuditInfo(data, value) {
    this.AuditName = value;
    this.d_FromDate = data.d_FromDate;
    this.d_QMSCertificatioDate = data.d_QMSCertificatioDate;
    this.d_QMSExpiryDate = data.d_QMSExpiryDate;
    this.d_RevisionDate = data.d_RevisionDate;
    this.d_Todate = data.d_Todate;
    this.s_AuditCode = data.s_AuditCode;
    this.s_AuditUniqueCode = data.s_AuditUniqueCode;
    this.s_PlantName = data.s_PlantName;
    this.s_ProductCode = data.s_ProductCode;
    this.s_TemplateName = data.s_TemplateName;
    this.MapEmployee = data.MapEmployee;
    this.s_PlantHeadCode = data.s_PlantHeadCode;
    this.s_PlantQualityHeadCode = data.s_PlantQualityHeadCode;
  }
  SetAudit() {
    if (this.AuditSelect.valid) {

      this.showProgress = true;

      this.showProgress = false;
      if (sessionStorage.getItem("status") == "Score") {
        sessionStorage.setItem('selectedAuditForscore', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('selectedplantForscore', this.AuditSelect.value.seletAudit.s_PlantCode)
        this._route.navigate(['score'])

      }
      if (sessionStorage.getItem("status") == "ScoreComplete") {
        sessionStorage.setItem('selectedAuditForscore', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('selectedplantForscore', this.AuditSelect.value.seletAudit.s_PlantCode)
        this._route.navigate(['score'])

      }
      else if (sessionStorage.getItem("status") == "Audittemplate" || sessionStorage.getItem("status") == "AuditComplete") {

        sessionStorage.setItem('selectedAudit_', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('selectedAudit_Plant', this.AuditSelect.value.seletAudit.s_PlantCode)
        this._route.navigate(['quiz']);

      }
      else if (sessionStorage.getItem("status") == "AuditRemark") {

        sessionStorage.setItem('AuditRemark_s_AuditCode', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('AuditRemark_s_PlantCode', this.AuditSelect.value.seletAudit.s_PlantCode)
        console.log(this.auditArray);
        var s_AuditCode = this.auditArray.filter(items => items.s_AuditCode == this.AuditSelect.value.seletAudit.s_AuditCode)
        console.log(s_AuditCode[0].s_AuditName);
        sessionStorage.setItem('AuditRemark_s_AuditName', s_AuditCode[0].s_AuditName)
        this._route.navigate(['ReviewQuestionList']);

      }
      else if (sessionStorage.getItem("status") == "LeadRemark") {

        sessionStorage.setItem('LeadRemark_s_AuditCode', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('LeadRemark_s_PlantCode', this.AuditSelect.value.seletAudit.s_PlantCode)
        var s_AuditCode = this.auditArray.filter(items => items.s_AuditCode == this.AuditSelect.value.seletAudit.s_AuditCode)
        console.log(s_AuditCode[0].s_AuditName);
        sessionStorage.setItem('LeadRemark_s_AuditName', s_AuditCode[0].s_AuditName)
        this._route.navigate(['LeadQuesList']);

      }
      else if (sessionStorage.getItem("status") == "ApprovedAudit") {

        sessionStorage.setItem('Glob_s_AuditCode', this.AuditSelect.value.seletAudit.s_AuditCode)
        sessionStorage.setItem('Glob_s_PlantCode', this.AuditSelect.value.seletAudit.s_PlantCode)
        var s_AuditCode = this.auditArray.filter(items => items.s_AuditCode == this.AuditSelect.value.seletAudit.s_AuditCode)
        console.log(s_AuditCode[0].s_AuditName);
        sessionStorage.setItem('Glob_s_AuditName', s_AuditCode[0].s_AuditName)
        sessionStorage.setItem('Glob_Status', 'ApprovedAudit')
        this._route.navigate(['ApprovedList']);

      }

    }
  }
  Cancel() {
    this._route.navigate(['dashboard']);
  }
}
