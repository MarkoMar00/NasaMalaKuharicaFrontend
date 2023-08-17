import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {Recepy} from "../Recepy";
import {RecepyService} from "../recepy.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  currentUser: User | undefined;
  recepies: Recepy[] = [];


  constructor(private route: ActivatedRoute, private userService: UserService, private recepyService: RecepyService, private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);

    this.recepyService.getAllRecepies()
      .subscribe(recepies => this.recepies = recepies);
  }

  recepyDetails(id: number){
    this.router.navigate(['/recepyDetail', id]);
  }

}
