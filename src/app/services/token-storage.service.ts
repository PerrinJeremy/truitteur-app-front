import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    public isAuthenticated: boolean = false

    constructor(private router: Router) { }


    signOut(): void {
        window.sessionStorage.clear();
        this.router.navigateByUrl('/')
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {

        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.isAuthenticated = true;
    }

    public getStoredUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            this.isAuthenticated = true;
            return JSON.parse(user);
        }
        this.isAuthenticated = false;
        return false;
    }
}