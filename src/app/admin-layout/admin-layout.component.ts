import { Component, OnInit } from '@angular/core';
import { AuditService } from '../services/audit.service'
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { passRole } from '../Models/models';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  getButtonvalue:[];
  loginName: string
  constructor(private AuditService: AuditService,private Common:CommonService, private CommonService: CommonService, private _router: Router) { }

  ngOnInit() {
    this.loginName = this.CommonService.getFullName()
    this.AuditService.DashboardData_(this.formValue()).subscribe(data=>{
      if(data.ResponseCode=="00")
      {
        this.getButtonvalue=data.ResponseData[0].DashboardDetail;
  
      }
    });
  }

  formValue():passRole
  {
    const data: any = {} as any;
  data.s_EmployeeCode=this.Common.getEmployeeCode();
  data.EmployeeRole=this.Common.getRoleCode();
return data
  }
 
  Activity(status,name)
  {
    if(status=='Audittemplate')
{
  sessionStorage.setItem('status','Audittemplate')
  sessionStorage.setItem('statusname',name)
this._router.navigate(['AuditDrop'])
}
if(status=='AuditComplete')
{
  
  sessionStorage.setItem('status','AuditComplete')
  sessionStorage.setItem('statusname',name)
  this._router.navigate(['SelectauditComplete'])
}
if(status=='ScoreAssessment')
{
  sessionStorage.setItem('status','Score')
  sessionStorage.setItem('statusname',name)
this._router.navigate(['ScoreDrop'])
}
if(status=='AuditReview')
{
  sessionStorage.setItem('status','AuditRemark')
  sessionStorage.setItem('statusname',name)
this._router.navigate(['AuditReview'])
}
else if(status=='LeadReview')
{
  sessionStorage.setItem('status','LeadRemark')
  sessionStorage.setItem('statusname',name)
  this._router.navigate(['LeadReview'])
}
else if(status=='ScoreComplete')
{
  sessionStorage.setItem('status','ScoreComplete')
  sessionStorage.setItem('statusname',name)
  this._router.navigate(['ScoreComplete'])
}
else if(status=='ApprovedAudit')
{
  
  sessionStorage.setItem('status','ApprovedAudit')
  sessionStorage.setItem('statusname',name)
  this._router.navigate(['DrpApproveAudit'])
}
else if(status=='report')
{
  this._router.navigate(['Report'])
}
  }
  logout() {
    this.AuditService.loggedOut();
  }
}
