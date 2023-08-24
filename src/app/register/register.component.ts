import {Component, OnInit} from '@angular/core';
import {User} from "../object-models/User";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {elementAt} from "rxjs";
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  newUser : User = new User();
  confirmPass : String = '';
  users: User[] = [];

  constructor(private router : Router, private userService: UserService, private authService: AuthorizationService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSubmit(form : NgForm) {
    if (form.invalid){
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Krivo uneseni podaci!
        </span>
      `;

      const err = document.getElementById('inv');
      err?.appendChild(el);
    }
    else {
      this.createUser();
    }
  }

  createUser() {
    if (this.newUser.password == this.confirmPass) {
      this.authService.register(this.newUser)
        .subscribe(user => {
          this.users.push(user);
          });

      setTimeout(() => {
        this.router.navigate(['/main', this.newUser.username]);
      }, 1000);
    }
  }
}
