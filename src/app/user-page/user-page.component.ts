import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  articles: Article[]
  selectedArticle: Article;
  page: number;
  username: string;
  account: User;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.name
    this.page = 0;
    this.userService.getUserProfileByName(this.username).subscribe((data: User) => {
      this.account = data
    })
    this.articleService.getUserArticles(this.page, this.username).subscribe((data: Article[]) => {
      this.articles = data
    })
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

  onScroll() {
    this.page++
    this.username = this.router.url.split('/user/')[1];
    this.articleService.getUserArticles(this.page, this.username).subscribe((data: Article[]) => {
      this.articles = this.articles.concat(data)
    })
  }
}
