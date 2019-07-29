import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditService } from '../services/audit.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _LoginService:AuditService,
    private _Router:Router)
  {


  }
  canActivate():boolean{
    
    if(this._LoginService.loggedIn()  )
    {
      return true
    }
    else
    {

      this._Router.navigate(['/login'])
      return false;
    }
  }
}

