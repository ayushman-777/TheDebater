import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubtopicService} from "../shared/services/subtopic.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
  constructor(public activeRoute: ActivatedRoute,
              public subtopicService: SubtopicService,
              private modalService: NgbModal) {
  }
  subtopic: any;
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.subtopicService.getSubtopic(params['id']).subscribe(subtopic => {
        this.subtopic = subtopic;
      });
    });
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
