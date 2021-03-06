import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../user';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, OnChanges {

  @Input() account?: {
    id: string,
    name: string,
    tag: string,
    followers: number,
    following: string[],
    banner: string
    picture: string
  };

  id: string
  name: string
  tag: string
  user: User
  followers: number
  following: string[]
  isFollowed: boolean
  banner: string
  picture: string
  isImageLoaded: boolean
  selectedFile: ImageSnippet

  constructor(private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.setUser()
  }
  ngOnChanges() {
    this.setUser()
  }

  setUser() {
    const {
      id, tag, name, followers, following,
      banner, picture
    } = this.account
    this.user = this.tokenStorage.getStoredUser();
    this.id = id;
    this.name = name;
    this.tag = tag;
    this.banner = banner;
    this.picture = picture ? picture : 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg';
    this.followers = followers;
    this.following = following;
    this.isFollowed = this.user.following.includes(this.id);
  }

  follow() {
    this.userService.follow(this.id).subscribe(
      user => {
        this.isFollowed = true
        return this.tokenStorage.saveUser(user);
      },
      err => console.log(err)
    );
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

  pictureLoaded(name: string) {
    this.banner = 'https://whispering-river-67114.herokuapp.com/upload/' + name;
    this.isImageLoaded = true
    this.user.banner = this.banner
    this.userService.updateUser(this.user).subscribe((user) => {
      this.tokenStorage.saveUser(user)
    },
      err => console.log(err))
  }

  processPicture(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.userService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.profilePicLoaded(res.image.filename)
        },
        (err) => {

        })
    });

    reader.readAsDataURL(file);
  }

  profilePicLoaded(name: string) {
    this.picture = 'https://whispering-river-67114.herokuapp.com/upload/' + name;
    this.user.picture = this.picture
    this.userService.updateUser(this.user).subscribe((user) => {
      this.tokenStorage.saveUser(user)
    },
      err => console.log(err))
  }

}
