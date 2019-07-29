import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService} from '../services/audit.service';
import { CommonService} from '../services/common.service';
import {PendingAuditList} from '../Models/common'

@Component({
  selector: 'app-select-audit',
  templateUrl: './select-audit.component.html',
  styleUrls: ['./select-audit.component.css']
})
export class SelectAuditComponent implements OnInit {
  AuditSelect:FormGroup;
  auditArray:any[];
  constructor(private fb:FormBuilder,private AuditService:AuditService,private CommonService:CommonService) { }

  ngOnInit() {
    this.AuditSelect=this.fb.group({
seletAudit:['',Validators.required]
    })
    PendingAuditList.s_EmployeeCode=this.CommonService.getEmployeeCode();
    this.AuditService.GetPendingAudit(PendingAuditList).subscribe(
      data=>{
        
        if(data.ResponseCode=="00")
        {
          
          this.auditArray=data.ResponseData;
        }
      }
    )
  }

  SetAudit()
  {
    if(this.AuditSelect.valid)
    {
      
    }
  }

}
