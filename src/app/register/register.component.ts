import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  newUser : User = new User();
  confirmPass : String = '';
  isValid : boolean = false;

  constructor(private router : Router, private userService: UserService) {}

  ngOnInit(): void {
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
    if (this.isValid && this.newUser.password == this.confirmPass) {
      this.userService.saveUser(this.newUser);
      let username = this.newUser.username;
      this.router.navigate(['/main', username]);
    }
  }

}
