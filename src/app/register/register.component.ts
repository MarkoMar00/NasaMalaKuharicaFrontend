import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  newUser : User = new User();
  confirmPass : String = '';
  isValid : boolean = false;
  users: User[] = [];

  constructor(private router : Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSubmit(form : NgForm) {
    this.isValid = false;
    if (form.invalid){
      return;
    }
    this.isValid = true;
    this.createUser();
  }

  createUser() {
    if (this.isValid && this.newUser.password == this.confirmPass && !this.isUsernameUnique(this.newUser)) {
      this.userService.saveUser(this.newUser)
        .subscribe(user => {
          this.users.push(user);
          });

      setTimeout(() => {
        this.router.navigate(['/main', this.newUser.username]);
      }, 1000);
    }
    else if (this.isUsernameUnique(this.newUser)){
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Korisničko ime već postoji!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
    }
  }

  isUsernameUnique(user: User) {
    for (let u of this.users){
      if (u.username == user.username){
        return true;
      }
    }
    return false;
  }


}
