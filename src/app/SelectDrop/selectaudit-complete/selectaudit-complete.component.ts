import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-selectaudit-complete',
  templateUrl: './selectaudit-complete.component.html',
  styleUrls: ['./selectaudit-complete.component.css']
})
export class SelectauditCompleteComponent implements OnInit {

  dataa:string;
  test:boolean=false;
  public previewdata = new BehaviorSubject('no data');
  constructor() { }

  ngOnInit() {
  }
  onEmployeeCountRadioButtonChange(name :string):void
  {

    this.previewdata.next(name);
this.test=true;
    
  }
}
