import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteComponent implements OnInit {

  tag = new FormControl('');

  @Output() completeEvent = new EventEmitter()

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let user = this.tokenStorage.getStoredUser();
    user.tag = this.tag.value;
    this.userService.updateUser(user).subscribe(
      (user) => {
        this.tokenStorage.saveUser(user)
        this.completeEvent.emit(true)
        this.router.navigateByUrl('/')
      },
      err => console.log(err)
    );
  }
}
