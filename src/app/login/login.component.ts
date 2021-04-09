import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  @Output() loggedInEvent = new EventEmitter<any>();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      user => {
        if (user.id) {
          this.tokenStorage.saveToken(user.token);
          this.tokenStorage.saveUser(user);
          this.isLoginFailed = false;
          this.loggedInEvent.emit(true)
        } else {
          alert('Utilisateur inexistant ou mot de passe erroné')
        }
      },
      err => console.log(err)
    );
  }

}
