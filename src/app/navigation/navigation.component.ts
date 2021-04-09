import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  tag: string

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, public matDialog: MatDialog) {
  }


  get isAuthenticated(): boolean {
    return this.tokenStorageService.isAuthenticated;
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.userService.getUserProfile().subscribe(user => {
        this.tag = user.tag
        return this.tokenStorageService.saveUser(user);
      })
    }
  }

  openModal(type: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.data = { type: type };
    dialogConfig.autoFocus = true
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  logout() {
    this.tokenStorageService.signOut()
    window.location.reload();
  }
}
