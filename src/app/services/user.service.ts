import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../user';
import { TokenStorageService } from './token-storage.service';


@Injectable({ providedIn: 'root' })
export class UserService {

    private url = 'http://localhost:80/user/';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient, private tokenStorageService: TokenStorageService) { }

    getUserProfile() {
        let token = this.tokenStorageService.getToken();
        let user = this.tokenStorageService.getStoredUser();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.get<User>(this.url + user.id, httpOptions)
    }
    getUserProfileByName(name: string) {
        let token = this.tokenStorageService.getToken();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.get<User>('http://localhost:80/tag/' + name, httpOptions)
    }
    updateUser(user: User): Observable<User> {
        let token = this.tokenStorageService.getToken();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.post<User>(this.url + user.id, user, httpOptions)
    }

    follow(id: String): Observable<any> {
        let token = this.tokenStorageService.getToken();
        let user = this.tokenStorageService.getStoredUser();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.post(this.url + 'follow/' + user.id, { id: id }, httpOptions)
    }

    unfollow(id: String): Observable<any> {
        let token = this.tokenStorageService.getToken();
        let user = this.tokenStorageService.getStoredUser();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.post(this.url + 'unfollow/' + user.id, { id: id }, httpOptions)
    }

    like(id: String): Observable<any> {
        let token = this.tokenStorageService.getToken();
        let user = this.tokenStorageService.getStoredUser();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.post(this.url + 'like/' + user.id, { id: id }, httpOptions)
    }

    unlike(id: String): Observable<any> {
        let token = this.tokenStorageService.getToken();
        let user = this.tokenStorageService.getStoredUser();
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            })
        };
        return this.http.post(this.url + 'unlike/' + user.id, { id: id }, httpOptions)
    }

    uploadImage(image: File): Observable<any> {
        const formData = new FormData();
        let caption = this.tokenStorageService.getStoredUser().id + image.name;
        formData.append('caption', caption);
        formData.append('file', image);
        return this.http.post<any>('http://localhost:80/upload/', formData);
    }
}