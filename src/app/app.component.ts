import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean

  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit() {
    this.isAuthenticated = this.tokenStorageService.isAuthenticated
  }
}
