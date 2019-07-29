import { Component,ViewChild, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {
imagesrc:string;
AudioSrc:string;
pdfSrc:SafeResourceUrl;
safeSrc: SafeResourceUrl;
  constructor( @Inject(MAT_DIALOG_DATA) data,private sanitizer: DomSanitizer) {
    
   debugger;
   console.log(data.substring(data.lastIndexOf('.') + 1).toLowerCase());
    if(data.substring(data.lastIndexOf('.') + 1).toLowerCase()=="mp3")
    {
      this.AudioSrc=data
      this.imagesrc=null;
      this.pdfSrc=null;
    }
    else if(data.substring(data.lastIndexOf('.') + 1).toLowerCase()=="pdf")
    { 
      
      this.pdfSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(data);
this.imagesrc=null;
this.AudioSrc=null;
    }
    else if (data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'JPEG' || data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'jpg' || data.substring(data.lastIndexOf('.') + 1).toLowerCase() == 'png') 
    {
      
      this.imagesrc=data;
      this.AudioSrc=null;
this.pdfSrc=null;
    }
    else
    {
      this.imagesrc=data;
      this.AudioSrc=null;
this.pdfSrc=null;
}
    
    
   }

  ngOnInit() {
    
  }

}
