import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {

  constructor(private _route: Router,) { }

  ngOnInit() {
  }
  getCode(data):void
  {
    if(data.type=='ApprovedData')
    {
      debugger;
      sessionStorage.setItem('ViewDataByCode',JSON.stringify(data));
      this._route.navigate(['ApprovedbyCode']);
    }

  }
}
