import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuditService} from '../services/audit.service'
import { RootObject } from '../Models/models';
import Swal  from 'sweetalert2'
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  showProgress=false;
  login:FormGroup;
  constructor(private router:Router,
    private fb:FormBuilder,private AuditService:AuditService) { }

  ngOnInit() {
   
        this.login=this.fb.group({
      UserName: new FormControl('',[Validators.required]),
      Password:new FormControl('',[Validators.required]),
      IsDomain:new FormControl('false'),
      LoginName:new FormControl('')
    })
  }
  login_()
  {
    this.showProgress=true
this.AuditService.loginAuth(this.login.value).subscribe(
  data=>{
     
    this.showProgress=false;
    if(data.ResponseCode=="00")
    {
     this.setSession(data.ResponseData)
    }
    else{
      Swal.fire('Oops...', 'incorrect username or password!', 'error')
    }
  },(err)=>{
    console.log('error occured',err);
  }
);

  }

  setSession(data)
  {
    localStorage.setItem('token', data.token);
    localStorage.setItem('loginData', JSON.stringify(data) );
    this.router.navigate(['dashboard'])
  }

}
