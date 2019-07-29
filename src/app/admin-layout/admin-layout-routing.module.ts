import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';
import {TemplateformComponent} from '../templateform/templateform.component'
import { ScoreComponent } from '../score/score.component';
import {PendingreviewComponent} from '../ReviewAudit/pendingreview/pendingreview.component'
import {ReviewQuestionListComponent} from '../ReviewAudit/review-question-list/review-question-list.component'
import {LeadApproveComponent} from '../lead/lead-approve/lead-approve.component'
import {LeadQuesListComponent} from '../lead/lead-ques-list/lead-ques-list.component'
import {AuditDropComponent} from '../SelectDrop/audit-drop/audit-drop.component'
import { ScoreDropComponent } from '../SelectDrop/score-drop/score-drop.component';
import { AuditReviewDropComponent } from '../SelectDrop/audit-review-drop/audit-review-drop.component';
import { LeadReviewDropComponent } from '../SelectDrop/lead-review-drop/lead-review-drop.component';
import { ReportComponent } from '../report/report.component';
import { SelectauditCompleteComponent } from '../SelectDrop/selectaudit-complete/selectaudit-complete.component';
import { ScoreCompleteComponent } from '../SelectDrop/score-complete/score-complete.component';
import { DrpApproveAuditComponent } from '../SelectDrop/drp-approve-audit/drp-approve-audit.component';
import { ApprovedListComponent } from '../ApprovedAudit/approved-list/approved-list.component';
import { ApprovedbyCodeComponent } from '../ApprovedAudit/approvedby-code/approvedby-code.component';
export const AdminLayoutRoutes: Routes = [
  { path: 'quiz',component: QuizComponent ,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'template',component:TemplateformComponent,canActivate:[AuthGuard]},
  {path:'score',component:ScoreComponent,canActivate:[AuthGuard]},
  {path:'Pendingreview',component:PendingreviewComponent,canActivate:[AuthGuard]},
  {path:'ReviewQuestionList',component:ReviewQuestionListComponent,canActivate:[AuthGuard]},
  {path:'LeadApprove',component:LeadApproveComponent,canActivate:[AuthGuard]},
  {path:'LeadQuesList',component:LeadQuesListComponent,canActivate:[AuthGuard]},
  {path:'AuditDrop',component:AuditDropComponent,canActivate:[AuthGuard]},
  {path:'ScoreDrop',component:ScoreDropComponent,canActivate:[AuthGuard]},
  {path:'AuditReview',component:AuditReviewDropComponent,canActivate:[AuthGuard]},
  {path:'LeadReview',component:LeadReviewDropComponent,canActivate:[AuthGuard]},
  {path:'Report',component:ReportComponent,canActivate:[AuthGuard]},
  {path:'SelectauditComplete',component:SelectauditCompleteComponent,canActivate:[AuthGuard]},
  {path:'ScoreComplete',component:ScoreCompleteComponent,canActivate:[AuthGuard]},
  {path:'DrpApproveAudit',component:DrpApproveAuditComponent,canActivate:[AuthGuard]},
  {path:'ApprovedList',component:ApprovedListComponent,canActivate:[AuthGuard]},
  {path:'ApprovedbyCode',component:ApprovedbyCodeComponent,canActivate:[AuthGuard]},
];


export class AdminLayoutRoutingModule { }
