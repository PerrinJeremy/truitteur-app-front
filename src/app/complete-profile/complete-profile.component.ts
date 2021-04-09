import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteComponent implements OnInit {

  tag = new FormControl('');

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let user = this.tokenStorage.getStoredUser();
    user.tag = this.tag.value;
    this.userService.updateUser(user).subscribe(
      (user) => {
        this.tokenStorage.saveUser(user)
        this.router.navigateByUrl('/')
      },
      err => console.log(err)
    );
  }
}
