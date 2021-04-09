import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[]
  selectedArticle: Article;
  page: number;
  username: string;
  isAuthenticated = this.tokenService.isAuthenticated

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.name
    this.tokenService.isAuthenticated
    this.page = 0;
    if (!this.username) {
      this.articleService.getArticles(this.page).subscribe((data: Article[]) => {
        this.articles = data
      })
    } else {
      this.articleService.getUserArticles(this.page, this.username).subscribe((data: Article[]) => {
        this.articles = data
      })
    }
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

  onScroll() {
    this.page++
    this.username = this.router.url.split('/user/')[1];
    if (!this.username) {
      this.articleService.getArticles(this.page).subscribe((data: Article[]) => {
        this.articles = this.articles.concat(data)
      })
    } else {

      this.articleService.getUserArticles(this.page, this.username).subscribe((data: Article[]) => {
        this.articles = this.articles.concat(data)
      })
    }
  }
}
