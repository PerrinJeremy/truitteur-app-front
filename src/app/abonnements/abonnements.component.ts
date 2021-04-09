import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.scss']
})
export class AbonnementsComponent implements OnInit {

  @Input() account?: {
    id: string,
    name: string,
    tag: string
  };

  id: string
  name: string
  tag: string
  user: User
  isFollowed: boolean

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const {
      id, tag, name
    } = this.account
    this.user = this.tokenStorage.getStoredUser();
    this.id = id;
    this.name = name;
    this.tag = tag;
    if (this.user) { this.isFollowed = this.user.following.includes(this.id); } else {
      this.isFollowed = false
    }
  }

  follow() {
    if (this.user) {
      this.userService.follow(this.id).subscribe(
        user => {
          this.isFollowed = true
          return this.tokenStorage.saveUser(user);
        },
        err => console.log(err)
      );
    } else {
      this.router.navigateByUrl('/login')
    }
  }
  unfollow() {
    this.userService.unfollow(this.id).subscribe(
      user => {
        this.isFollowed = false
        return this.tokenStorage.saveUser(user);
      },
      err => console.log(err)
    );
  }
}
