import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditService } from '../services/audit.service';

@Injectable({
  providedIn: 'root'
})
export class PreventloginGuard implements CanActivate {
  constructor(private _LoginService:AuditService,
    private _Router:Router)
  {

  }
  canActivate():boolean{
    
    if(this._LoginService.loggedIn()  )
    {
      this._Router.navigate(['/dashboard'])
      return false
    }
    else
    {
      return true
    }
   
  }
}
