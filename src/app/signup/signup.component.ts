import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Output() registeredInEvent = new EventEmitter()
  
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isRegisterFailed = false;
  isRegistered = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      user => {
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
        this.isRegisterFailed = false;
        this.registeredInEvent.emit(true)
        this.router.navigateByUrl('/complete-profile')
      },
      err => console.log(err)
    );
  }

}
