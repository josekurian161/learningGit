import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/Models/field.interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ImagePopupComponent } from 'src/app/image-popup/image-popup.component';

@Component({
  selector: 'app-image',
  template: `

  `,
  styles: []
})
export class ImageComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(value): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = value;

    let dialogRef = this.dialog.open(ImagePopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
