import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})
export class AccountPreviewComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  @Input() account: User;
  id: string
  user: User;
  tag: string;
  name: string;
  picture: string;
  isLoaded = false;
  isFollowed: boolean;
  following: number;
  followers: number;
  ngOnInit(): void {
    const {
      id, tag, name,
      picture,
      following,
      followers
    } = this.account
    this.user = this.tokenStorage.getStoredUser();
    this.tag = tag;
    this.id = id;
    this.name = name;
    this.picture = picture
    this.isLoaded = true;
    this.followers = followers;
    this.following = following.length;
    if (this.user) { this.isFollowed = this.user.following.includes(this.id); } else {
      this.isFollowed = false
    }
  }

}
