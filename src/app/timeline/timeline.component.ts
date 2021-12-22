import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log(params['id']);
    });
  }

}
