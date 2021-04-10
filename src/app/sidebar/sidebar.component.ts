import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  accounts: User[]


  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    let user = this.tokenStorageService.getStoredUser()
    let following = [];
    if (user) {
      following = user.following
    }
    this.userService.getProposalList(following).subscribe(data => { this.accounts = data.users })
  }

}
