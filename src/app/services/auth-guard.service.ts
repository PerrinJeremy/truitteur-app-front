import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public tokenStorageService: TokenStorageService, public router: Router) { }
    canActivate(): boolean {
        if (!this.tokenStorageService.isAuthenticated) {
            return false;
        }
        return true;
    }
}