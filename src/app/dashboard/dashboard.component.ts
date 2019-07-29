import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router'
  import { from } from 'rxjs';
  import {CommonService} from '../services/common.service'
import { passRole } from '../Models/models';
import { AuditService } from '../services/audit.service';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('lineChart') 
  lineChart_: ElementRef;
  @ViewChild('barChart') 
  barChart_: ElementRef;
  
  getButtonvalue:[];
  LineChart=[];
  BarChart=[];
  showProgress:boolean=true;
  constructor(private _router:Router,private Common:CommonService,private AuditService:AuditService ) { }

  ngOnInit() {
    // Bar chart:
    sessionStorage.clear();
  this.AuditService.DashboardData_(this.formValue()).subscribe(data=>{
    this.showProgress=false;
    if(data.ResponseCode=="00")
    {
      this.getButtonvalue=data.ResponseData[0].DashboardDetail;
      this.formGraph();
    }
  });


  }
  ngAfterViewInit() {
 
    
}
 formGraph()
 {
   
   let lineChart_ = this.lineChart_.nativeElement;
   let barChart_ = this.barChart_.nativeElement;
   
  this.LineChart = new Chart(lineChart_, {
    type: 'line',
  data: {
   labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
   datasets: [{
       label: 'Number of Audit Done in Months',
       data: [9,7 , 3, 5, 2, 10,15,16,19,3,1,9],
       fill:false,
       lineTension:0.2,
       borderColor:"red",
       borderWidth: 1
   }]
  }, 
  options: {
   title:{
       text:"Line Chart",
       display:true
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   }
  }
  });

  this.BarChart = new Chart(barChart_, {
    type: 'bar',
  data: {
   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
   datasets: [{
       label: '# of Votes',
       data: [9,7 , 3, 5, 2, 10],
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
   title:{
       text:"Bar Chart",
       display:true
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   }
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
}
