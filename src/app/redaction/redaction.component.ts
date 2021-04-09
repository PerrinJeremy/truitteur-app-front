import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redaction',
  templateUrl: './redaction.component.html',
  styleUrls: ['./redaction.component.scss']
})
export class RedactionComponent implements OnInit {

  @Output() publishedEvent = new EventEmitter<any>();

  text = new FormControl('')
  user: User
  image: String
  isImageLoaded: boolean;

  constructor(private articleService: ArticleService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getStoredUser();
    this.isImageLoaded = false
    this.image = ''
  }

  publish() {
    console.log(this.user);
    this.articleService.addArticle({
      author: {
        id: this.user.id,
        name: this.user.name,
        tag: this.user.tag,
      },
      image: this.image,
      text: this.text.value
    }).subscribe(article => {
      this.publishedEvent.emit(true)
      window.location.reload()
    })
  }

  pictureLoaded(name: string) {
    this.image = 'https://whispering-river-67114.herokuapp.com/upload/' + name;
    this.isImageLoaded = true
  }
}
