import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  title = ""
  description = ""
  showButtons = false;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.isMultiple) {
      this.showButtons = true;
    }
    this.title = this.data.title
    this.description = this.data.description
  }

  close() {
    this.dialogRef.close()
  }

  confirm () {
    this.dialogRef.close(true)
  }

}
