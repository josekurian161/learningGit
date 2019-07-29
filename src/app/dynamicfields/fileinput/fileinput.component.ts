import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../Models/field.interface';
import { ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ImagePopupComponent } from 'src/app/image-popup/image-popup.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-fileinput',
  template: `
  <div class="imgBrws" [formGroup]="group">
  <div class="inContent" fxLayout="row" fxFlex fxLayout.xs="column"  fxLayout.sm="column" >
    <div class="item item-1" fxFlex>
      <mat-card>
        <button *ngIf="status" mat-button mat-flat-button type="button" (click)="fileInput.click()" class="button" >{{field.name}}</button> 
        <div class="imgBox"> <img *ngIf="field.name=='image'"   src="{{group.get('imageUrl').value}}" (click)="openDialog(group.get('imageUrl').value)" >
         <audio controls="controls" style="width: 250px;"  *ngIf="VoiceControlVisible" [src]="msbapAudioUrl"></audio>
          <button type="button"  *ngIf="!status" (click)="RemoveImage(field)" id = "x" color="primary" class="btnClose">X</button>
        </div>
        <input  #RefInput (change)="onSelectFile($event,field)"  #fileInput  type="file" hidden>
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(validation.name) &&  group.get(field.name).touched">{{validation.message}}</mat-error>
        </ng-container>
      </mat-card>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class FileinputComponent implements OnInit {
  @ViewChild('RefInput')
  RefInput: ElementRef;
  field: FieldConfig;
  group: FormGroup;
  constructor(public dialog: MatDialog) { }
  status: boolean = true;
  VoiceControlVisible: boolean = true;
  msbapTitle = 'Audio Title';
  msbapAudioUrl
  ngOnInit() {
     
    if (this.field.name == "image") {
      this.VoiceControlVisible = false;
      if (this.group.get('imageUrl').value) {
        this.status = false;
      }
    }
    else if (this.field.name == "voice") {
      if (this.group.get('VoiceUrl').value) {
        this.msbapAudioUrl = this.group.get('VoiceUrl').value;
        this.VoiceControlVisible = true;
        this.status = false;
      }
      else {
        this.VoiceControlVisible = false;
      }

      
    }
  }
  RemoveImage(field) {
    if (field.name == "image") {
      this.group.get('imageUrl').setValue(null);
      this.group.get('image').setValue(null);
      this.status = true;
      this.RefInput.nativeElement.value = "";
    }
    else if (field.name == "voice") {
      this.group.get('VoiceUrl').setValue(null);
      this.group.get('voice').setValue(null);
      this.status = true;
      this.RefInput.nativeElement.value = "";
      this.VoiceControlVisible = false;
    }

  }

  openDialog(value): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = value;
    let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  onSelectFile(event, field) {
    if (field.name == "voice") {
      
      if (event.target.files && event.target.files[0]) {
        var Extension = event.target.files[0].name.substring(
          event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
          if (Extension == 'mp3' || Extension == 'mp4') {
          const file1 = event.target.files[0];
          const reader = new FileReader();
          const file = event.target.files[0];
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
            let target: any = event.target;
            this.group.get('VoiceUrl').setValue(target.result);
            this.msbapAudioUrl = target.result
          }
          this.group.get('voice').setValue(file);
          this.VoiceControlVisible = true;
          this.group.get('updatedVoiceSatus').setValue('1');
          this.status = false;
        }
        else {
          Swal.fire('Oops...', 'Upload only mp3 files!', 'error')
        }
      }
    }
    else
      if (field.name == "image") {
        if (event.target.files && event.target.files[0]) {
          var Extension = event.target.files[0].name.substring(
            event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
          if (Extension == 'JPEG' || Extension == 'jpg' || Extension == 'png') {
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => { // called once readAsDataURL is completed
              let target: any = event.target;
              this.group.get('imageUrl').setValue(target.result);
            }
            this.group.get('image').setValue(file);
            this.group.get('updatedImageSatus').setValue('1');
            this.status = false;
          }
          else {

            Swal.fire('Oops...', 'Photo only allows file types of  PNG, JPG and JPEG.', 'error')
          }

        }
      }

  }
}
