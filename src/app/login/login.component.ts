import {Component, OnInit} from '@angular/core';
import {User} from "../object-models/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthorizationService} from "../services/authorization.service";
import {UserLogin} from "../object-models/UserLogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user : UserLogin = new UserLogin();
  users : User[] = [];
  foundUser : boolean = false;

  constructor(private router: Router, private auth: AuthorizationService) {
  }

  ngOnInit(): void {}

  login() {

    console.log(this.user);

    this.auth.login(this.user)
      .subscribe((response) => {
        this.router.navigate(['/main', this.user.username])
      },
        (error: HttpErrorResponse) => {
          const el = document.createElement('div');
          el.innerHTML = `
            <span style="color: red">
                Krivo uneseni podaci, probajte ponovno!
            </span>
        `;
          const err = document.getElementById('err');
          err?.appendChild(el);
      });
  }

  register() {
    this.router.navigate(['/register']);
  }

}
