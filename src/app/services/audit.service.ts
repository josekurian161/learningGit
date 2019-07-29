import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http'
import {url,drpEmployeeMaster} from '../Models/common'
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, of, throwError, Observable} from 'rxjs';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})

export class AuditService {

  private AuditList = `${url.apiUriLogin}/admin/AuditList`;
  private login = `${url.apiUriLogin}/login/Authlogin`;
  private startAudit_=`${url.apiUriLogin}/admin/AuditCodeList`
  private insertQuestionAnswer=`${url.apiUriLogin}/admin/InsertAuditDetailList`
  private PendingAuditList=`${url.apiUriLogin}/admin/PendingAuditList`
  private InsertAuditfileList_=`${url.apiUriLogin}/admin/InsertAuditfileList`
  private LeadScoreAuditAssessmentList=`${url.apiUriLogin}/admin/LeadScoreAuditAssessmentList`
  private InsertUpdateAuditStatus =`${url.apiUriLogin}/admin/InsertUpdateAuditStatus `
  private InsertUpdateScoreAssesment_ =`${url.apiUriLogin}/admin/InsertUpdateScoreAssesment`
  private PendingAuditForApproval =`${url.apiUriLogin}/admin/PendingAuditForApproval`
  private InsertUpdateObservationLog =`${url.apiUriLogin}/admin/InsertObservationLog_data`
  private InsertObservationlog_file =`${url.apiUriLogin}/admin/InsertObservationlog_file`
  
  private DashboardData   =`${url.apiUriLogin}/admin/DashboardData  `
  private AuditInformationList   =`${url.apiUriLogin}/admin/AuditInformationList`
  constructor(private http:HttpClient,private _Router:Router) { }

  fetchData(test:any)
  {
     return this.http.post(this.AuditList,test)
  }


  startAudit(data:any):Observable<any>
  {
    return this.http.post(this.startAudit_,data)
  }

  loginAuth(data:any):Observable<any>
  {
     return this.http.post<any>(this.login,data).pipe(catchError(this.handlError));
  }

  InsertQuestionAnswer(data:any):Observable<any>
  {
    return this.http.post<any>(this.insertQuestionAnswer,data).pipe(catchError(this.handlError));
  }
  getscore(data:any):Observable<any>
  {
    return this.http.post<any>(this.LeadScoreAuditAssessmentList,data).pipe(catchError(this.handlError))
  }

  GetPendingAudit(data:any):Observable<any>
  {
    
    return this.http.post<any>(this.PendingAuditList,data).pipe(catchError(this.handlError))
  }
  
  InsertAuditfileList(data:FormData)
  {
    return this.http.post<any>(this.InsertAuditfileList_,data).pipe(catchError(this.handlError))
  }

  InsertUpdateAuditStatus_(data:any):Observable<any>
  {
    return this.http.post<any>(this.InsertUpdateAuditStatus,data).pipe(catchError(this.handlError))
  }
  InsertUpdateScoreAssesment(data:any):Observable<any>
  {
    return this.http.post<any>(this.InsertUpdateScoreAssesment_,data).pipe(catchError(this.handlError))
  }
  PendingAuditForApproval_(data:any):Observable<any>
  {
    return this.http.post<any>(this.PendingAuditForApproval,data).pipe(catchError(this.handlError))
  }
  InsertUpdateObservationLog_(data:any):Observable<any>
  {
    return this.http.post<any>(this.InsertUpdateObservationLog,data).pipe(catchError(this.handlError))
  }
  InsertObservationlog_file_(data:FormData)
  {
    return this.http.post<any>(this.InsertObservationlog_file,data).pipe(catchError(this.handlError))
  }
  DashboardData_(data:any):Observable<any>
  {
    return this.http.post<any>(this.DashboardData,data).pipe(catchError(this.handlError))
  }
  AuditInformationList_(data:any):Observable<any>
  {
    return this.http.post<any>(this.AuditInformationList,data).pipe(catchError(this.handlError))
  }
  handlError(error:HttpErrorResponse)
  {
    return throwError(error)
  }

  loggedIn()
  {
    if(localStorage.getItem('token') && localStorage.getItem('token') !="null")
    {
        return true;
    }
    else
    {
      return false;
    }
    // return !!localStorage.getItem('token') ||  !!localStorage.getItem('token') !=null
  }
  public getToken(): string {
    
    return localStorage.getItem('token');
  }
 

  loggedOut()
  {
    localStorage.removeItem('token')
    localStorage.clear();
    sessionStorage.clear();
   this._Router.navigate(['/login']);
  }
}
