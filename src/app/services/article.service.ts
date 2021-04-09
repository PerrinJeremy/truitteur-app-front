import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Article } from '../article';


@Injectable({ providedIn: 'root' })
export class ArticleService {

    private url = 'https://whispering-river-67114.herokuapp.com/articles';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    getArticles(page): Observable<Article[]> {
        return this.http.get<Article[]>(this.url, { params: { page: page } })
    }

    getUserArticles(page, name): Observable<Article[]> {
        return this.http.get<Article[]>(this.url + '/' + name, { params: { page: page } })
    }

    addArticle(article: any): Observable<Article> {
        return this.http.post<Article>(this.url, article, this.httpOptions)
    }

    deleteArticle(id: number): Observable<Article> {
        const url = `${this.url}/${id}`;
        return this.http.delete<Article>(url, this.httpOptions)
    }

    updateArticle(article: Article): Observable<any> {
        return this.http.put(this.url + '/' + article._id, article, this.httpOptions)
    }

    updatelikes(article: Article): Observable<any> {
        return this.http.put(this.url + '/likes/' + article._id, article, this.httpOptions)
    }
}