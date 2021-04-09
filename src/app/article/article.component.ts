import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import * as moment from 'moment';
import { User } from '../user';
import { TokenStorageService } from '../services/token-storage.service';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article;
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

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private articleService: ArticleService) {
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
      image
    } = this.article;
    this.isEditable = false;
    this.user = this.tokenStorage.getStoredUser();
    this.name = name;
    this.id = id;
    this.tag = tag;
    this.createdAt = createdAt;
    this.text = content;
    this.likes = likes;
    this.image = image;
    this.userService.getUserProfileByName(this.tag).subscribe(user => {
      this.picture = user.picture ? 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg' : user.picture;
    })
    if (this.user) { this.liked = this.user.likes.includes(this.article._id); }
    this.computeTime();
  }

  computeTime() {
    moment.locale('fr');
    let hours = Math.round(((new Date()).getTime() - (new Date(this.createdAt)).getTime()) / 3600000);
    let minutes = Math.round(((new Date()).getTime() - (new Date(this.createdAt)).getTime()) / 60000);
    hours >= 24 ? this.computedTime = moment(this.createdAt).format('Do MMM') : hours < 1 ? this.computedTime = minutes + 'min' : this.computedTime = hours + 'h'
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

  editArticle() {
    this.isEditable = !this.isEditable;
  }
  saveModif() {
    this.article.content = this.text;
    this.articleService.updateArticle(this.article).subscribe(() => {
      this.isEditable = false
    }, err => console.log((err)))
  }
}
