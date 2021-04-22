import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../article';
import * as moment from 'moment';
import { User } from '../user';
import { TokenStorageService } from '../services/token-storage.service';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article;
  @ViewChild('previewAccount') private div: ElementRef;
  account: User;
  computedTime: string;
  id: string;
  name: string;
  tag: string;
  createdAt: string;
  text: string;
  likes: number;
  liked: boolean;
  user: User;
  isEditable: boolean;
  image: string;
  picture: string;
  url: {
    url: string;
    img: string;
    description: string;
    domain: string;
  };
  isLoaded: boolean = false
  isFollowed: boolean
  isShown: boolean
  timeout;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private articleService: ArticleService,
    public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const {
      author: {
        id,
        name,
        tag
      },
      content,
      createdAt,
      likes,
      image,
      url
    } = this.article;
    this.isEditable = false;
    this.user = this.tokenStorage.getStoredUser();
    this.name = name;
    this.id = id;
    this.tag = tag;
    this.createdAt = createdAt;
    this.text = content;
    if (url) {
      this.url = url;
      this.extractUrl()
    }
    this.likes = likes;
    this.image = image;
    this.userService.getUserProfileByName(this.tag).subscribe(user => {
      this.account = user;
      this.picture = user.picture ? user.picture : 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg';
    })
    if (this.user) { this.liked = this.user.likes.includes(this.article._id); }
    this.computeTime();
    this.isLoaded = true
  }

  computeTime() {
    moment.locale('fr');
    let hours = Math.round(((new Date()).getTime() - (new Date(this.createdAt)).getTime()) / 3600000);
    let minutes = Math.round(((new Date()).getTime() - (new Date(this.createdAt)).getTime()) / 60000);
    hours >= 24 ? this.computedTime = moment(this.createdAt).format('Do MMM') : hours < 1 ? this.computedTime = minutes + 'min' : this.computedTime = hours + 'h'
  }

  extractUrl() {
    let regexUrl = /(https?:\/\/[^ ]*)/
    let url = this.text.match(regexUrl)[0];
    this.text = this.text.split(url)[0] + '<a class="link-article">' + url + '</a>' + this.text.split(url)[1]
  }

  likeHandle() {
    if (this.tokenStorage.isAuthenticated) {
      this.liked = !this.liked;
      if (!this.liked) {
        this.userService.unlike(this.article._id).subscribe(
          (user) => {
            this.tokenStorage.saveUser(user)
          },
          err => console.log(err)
        );
        this.user.likes = this.user.likes.filter(id => id !== this.article._id)
        this.likes--
      } else {
        this.userService.like(this.article._id).subscribe(
          (user) => {
            this.tokenStorage.saveUser(user)
          },
          err => console.log(err)
        );
        this.likes++
      }
      this.article.likes = this.likes
      this.articleService.updatelikes(this.article).subscribe(() => { return }, err => console.log(err))
    }
  }
  openModal(type: string, id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { type: type, id: id };
    dialogConfig.autoFocus = true
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  editArticle() {
    this.isEditable = !this.isEditable;
  }

  extractContent(text: string) {
    var span = document.createElement('span');
    span.innerHTML = text;
    return span.textContent || span.innerText;
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

  saveModif() {
    let text = this.extractContent(this.text)
    this.article.content = text;
    this.articleService.updateArticle(this.article).subscribe(() => {
      this.isEditable = false
    }, err => console.log((err)))
  }

  showPreview() {
    let div = this.div.nativeElement
    div.style.visibility = 'visible'
  }

  displayPreview(e: MouseEvent) {
    let div = this.div.nativeElement    
    div.style.visibility = 'hidden'
    div.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
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
