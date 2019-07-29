import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PreventloginGuard } from './guard/preventlogin.guard';
import { SelectAuditComponent } from './select-audit/select-audit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  { path: 'SelectAudit', component: SelectAuditComponent},
  { path: 'login', component: LoginComponent,canActivate:[PreventloginGuard] },
  { path: '404', component: PageNotFoundComponent,canActivate:[AuthGuard] },
  {path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
