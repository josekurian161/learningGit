import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { url, drpEmployeeMaster } from '../Models/common'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private getPlant_ = `${url.apiUriLogin}/admin/PlantMasterList`;
  private getTemplate_ = `${url.apiUriLogin}/admin/TemplateMasterList`;
  private getEmployee_ = `${url.apiUriLogin}/admin/EmployeeMasterList`;
  private interactAuditId = new BehaviorSubject<string>('');
  cast = this.interactAuditId.asObservable();

  constructor(private http: HttpClient) { }

  getAuditButtonStatus(data) {
    this.interactAuditId.next(data);
  }
  getPlant(data): Observable<any> {
    return this.http.post<any>(this.getPlant_, data)
  }
  getTemplate(data): Observable<any> {
    return this.http.post<any>(this.getTemplate_, data)
  }
  getEmployee(data): Observable<any> {
    drpEmployeeMaster.Search = data;
    return this.http.post<any>(this.getEmployee_, drpEmployeeMaster).pipe(map(data => {

      if (data.ResponseCode == "00") {
        return data.ResponseData
      }
      else {
        return null;
      }

    }));
  }
  getEmployeeCode(): string {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i.EmpCode;
    }
    else {
      return null;
    }
  }

  getFullName(): string {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i.FullName;
    }
    else {
      return null;
    }
  }

  getRoleCode(): any {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'));
      return i.EmployeeRole;

    }
    else {
      return null;
    }
  }
  getTemplateData(): any {

    if (localStorage.getItem('template') && localStorage.getItem('template') != "null") {
      var i = JSON.parse(localStorage.getItem('template'))
      return i;
    }
    else {
      return null;
    }
  }
  getselectedAudit(): any {
    if (localStorage.getItem('selectedAudit') && localStorage.getItem('') != "null") {
      var data = localStorage.getItem('selectedAudit')
      return data;
    }
    else {
      return null;
    }
  }
}
