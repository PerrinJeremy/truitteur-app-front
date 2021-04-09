import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isLogin: boolean
  isRegister: boolean
  isPublish: boolean

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const { type } = this.data
    console.log(type);
    if (type == 'login') {
      this.isLogin = true
    } else if (type == 'register') {
      this.isRegister = true
    } else if (type == 'publish') {
      this.isPublish = true
    } else if (type == 'complete') {
      this.isPublish = true
    }
  }

  closeModal() {
    this.dialogRef.close();
    window.location.reload()
  }

}
