import {Component, OnInit} from '@angular/core';
import {User} from "../object-models/User";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthorizationService} from "../services/authorization.service";
import {UserLogin} from "./UserLogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user : UserLogin = new UserLogin();
  users : User[] = [];
  foundUser : boolean = false;

  constructor(private userService: UserService, private router: Router, private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    /*this.userService.getUsers()
      .subscribe(users => this.users = users);*/
  }

  login() {

    console.log(this.user);

    this.auth.login(this.user)
      .subscribe(response => {
        this.router.navigate(['/main', this.user.username])
      });

    /*for (let pot_user of this.users) {
      if (pot_user.username == this.user.username && pot_user.password == this.user.password){
        this.foundUser = true;
      }
    }

    if (this.foundUser) {
      let username = this.user.username;
      this.router.navigate(['/main', username])
    }
    else {
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Krivo uneseni podaci, probajte ponovno!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
    }*/
  }

  register() {
    this.router.navigate(['/register']);
  }

}
