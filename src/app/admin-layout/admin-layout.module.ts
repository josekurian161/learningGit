import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout-routing.module';
import { QuizComponent } from '../quiz/quiz.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {LayoutModule} from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,  MatDatepickerModule,MatNativeDateModule, MatIconModule, MatListModule, MatSelectModule, MatInputModule, MatRadioModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DynamicFormComponent } from '../dynamicfields/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from '../dynamicfields/dynamic-field/dynamic-field.directive';
import { InputComponent } from '../dynamicfields/input/input.component';
import { ButtonComponent } from '../dynamicfields/button/button.component';
import {MyDialogComponent} from '../my-dialog/my-dialog.component'; 
import { FileinputComponent } from '../dynamicfields/fileinput/fileinput.component';
import { RadiobuttonComponent } from '../dynamicfields/radiobutton/radiobutton.component';
import { DateComponent } from '../dynamicfields/date/date.component';
import { SelectComponent } from '../dynamicfields/select/select.component';
import { ImageComponent } from '../dynamicfields/image/image.component';
import { QuestionselectComponent } from '../dynamicfields/questionselect/questionselect.component';
import { TemplateformComponent } from '../templateform/templateform.component';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { CheckboxComponent } from '../dynamicfields/checkbox/checkbox.component';
import {ScoreComponent} from '../score/score.component'
import {PendingreviewComponent} from '../ReviewAudit/pendingreview/pendingreview.component'
import {ReviewQuestionListComponent} from '../ReviewAudit/review-question-list/review-question-list.component'
import {LeadApproveComponent} from '../lead/lead-approve/lead-approve.component'
import {LeadQuesListComponent} from '../lead/lead-ques-list/lead-ques-list.component'
import {AuditDropComponent} from '../SelectDrop/audit-drop/audit-drop.component'
import { ScoreDropComponent } from '../SelectDrop/score-drop/score-drop.component';
import { AuditReviewDropComponent } from '../SelectDrop/audit-review-drop/audit-review-drop.component';
import { LeadReviewDropComponent } from '../SelectDrop/lead-review-drop/lead-review-drop.component';
import { ReportComponent } from '../report/report.component';
import { SelectauditCompleteComponent } from '../SelectDrop/selectaudit-complete/selectaudit-complete.component'
import {TextAreaComponent} from  '../dynamicfields/text-area/text-area.component'
import {MatTooltipModule} from '@angular/material/tooltip';
import {ScoreCompleteComponent} from '../SelectDrop/score-complete/score-complete.component'
import { DashboardFilterPipe } from '../CustomPipe/dashboard-filter.pipe';
import { DrpApproveAuditComponent } from '../SelectDrop/drp-approve-audit/drp-approve-audit.component';
import { ListComponent } from '../components/list/list.component';
import { ViewComponent } from '../components/view/view.component';
import {ApprovedListComponent} from '../ApprovedAudit/approved-list/approved-list.component'
import {ApprovedbyCodeComponent} from '../ApprovedAudit/approvedby-code/approvedby-code.component'
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { Ng2ImgMaxModule } from 'ng2-img-max';
@NgModule({

  imports: [
    NgxAudioPlayerModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild(AdminLayoutRoutes),
     MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    MatProgressBarModule,
    MatTooltipModule,
    Ng2ImgMaxModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [ 
    MyDialogComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    FileinputComponent,
    RadiobuttonComponent,
    DateComponent,
    QuestionselectComponent,
    ImageComponent,
    ImagePopupComponent,
    CheckboxComponent,
    TextAreaComponent
    
  ],
  declarations: [
    QuizComponent,
    DashboardComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    ButtonComponent,
    MyDialogComponent,
    SelectComponent,
    FileinputComponent,
    RadiobuttonComponent,
    DateComponent,
    QuestionselectComponent,
    TemplateformComponent,
    ImageComponent,
    ImagePopupComponent,
    CheckboxComponent,
    ScoreComponent,
    PendingreviewComponent,
    ReviewQuestionListComponent,
    LeadApproveComponent,
    LeadQuesListComponent,
    AuditDropComponent,
    ScoreDropComponent,
    AuditReviewDropComponent,
    LeadReviewDropComponent,
    ReportComponent,
    SelectauditCompleteComponent,
    TextAreaComponent,
    ScoreCompleteComponent,
    DashboardFilterPipe,
    DrpApproveAuditComponent,
    ListComponent,
    ViewComponent,
    ApprovedListComponent,
    ApprovedbyCodeComponent
  ]
})
export class AdminLayoutModule { }
