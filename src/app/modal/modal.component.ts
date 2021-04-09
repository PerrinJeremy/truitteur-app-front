import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isLogin: boolean
  isRegister: boolean
  isPublish: boolean
  isComplete: boolean
  type: string

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public matDialog: MatDialog) { }

  ngOnInit(): void {
    const { type } = this.data
    this.type = type
    console.log(type);
    if (type == 'login') {
      this.isLogin = true
    } else if (type == 'register') {
      this.isRegister = true
    } else if (type == 'publish') {
      this.isPublish = true
    } else if (type == 'complete') {
      this.isComplete = true
    }
  }

  closeModal() {
    this.dialogRef.close();
    if (this.type == 'register') {
      this.openModal('complete')
    } else window.location.reload()
  }

  openModal(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { type: type };
    dialogConfig.autoFocus = true
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
