import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from '../user';
import { TokenStorageService } from './token-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private url = 'http://localhost:80/auth/';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient) { }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.url + 'signup', user, this.httpOptions)
    }

    login(user: User): Observable<User> {
        return this.http.post<User>(this.url + 'login', user, this.httpOptions)
    }
}