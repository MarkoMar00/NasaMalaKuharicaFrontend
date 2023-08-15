import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  currentUser: User | undefined;


  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.currentUser = this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);
  }

}
