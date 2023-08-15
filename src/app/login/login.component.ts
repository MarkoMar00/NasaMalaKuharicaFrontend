import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user : User = new User();
  users : User[] = [];
  foundUser : boolean = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  login() {
    for (let pot_user of this.users) {
      if (pot_user.username == this.user.username && pot_user.password == this.user.password){
        this.foundUser = true;
      }
    }

    if (this.foundUser) {
      let username = this.user.username;
      this.router.navigate(['/main', username])
    }
  }

}
