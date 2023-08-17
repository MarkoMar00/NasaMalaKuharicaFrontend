import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recepy} from "../Recepy";
import {RecepyService} from "../recepy.service";

@Component({
  selector: 'app-recepy-detail',
  templateUrl: './recepy-detail.component.html',
  styleUrls: ['./recepy-detail.component.css']
})
export class RecepyDetailComponent implements OnInit{

  currentRecepy: Recepy | undefined;

  constructor(private route: ActivatedRoute, private recepyService: RecepyService) {
  }

  ngOnInit(): void {
    this.recepyService.getRecepyById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        recepy => this.currentRecepy = recepy
      );
  }



}
