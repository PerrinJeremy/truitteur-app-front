import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

  @Input() account?: User
  @ViewChild('previewAccount') private div: ElementRef;

  id: string
  name: string
  tag: string
  picture: string
  user: User
  isFollowed: boolean
  isAuthenticated: boolean
  isShown: boolean
  timeout;
  constructor(private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const {
      id, tag, name,
      picture
    } = this.account
    this.user = this.tokenStorage.getStoredUser();
    this.id = id;
    this.picture = picture ? picture : 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg';
    this.name = name;
    this.tag = tag;
    this.isAuthenticated = this.tokenStorage.isAuthenticated
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
      this.router.navigateByUrl('/')
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

  showPreview() {
    let div = this.div.nativeElement
    div.style.visibility = 'visible'
  }

  displayPreview(e: MouseEvent) {
    let div = this.div.nativeElement    
    div.style.visibility = 'hidden'
    div.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.showPreview()
    }, 500);
  }

  hidePreview() {
    clearTimeout(this.timeout);
    let div = this.div.nativeElement
    div.style.visibility = 'hidden'
  }
}
