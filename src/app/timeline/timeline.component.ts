import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubtopicService} from "../shared/services/subtopic.service";
import {ArticleService} from "../shared/services/article.service";
import {Article} from "../shared/models/article"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subtopic} from "../shared/models/subtopic";


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
  constructor(public activeRoute: ActivatedRoute,
              public subtopicService: SubtopicService,
              private articleService : ArticleService,
              private modalService: NgbModal) {
  }

  subtopic: any;
  articleForm: any;


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.subtopicService.getSubtopic(params['id']).subscribe(subtopic => {
        this.subtopic = subtopic;
      });
    });
    this.initializeArticleForm();
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  initializeArticleForm() {
    this.articleForm = new FormGroup({
      websiteUrl: new FormControl(null, { validators: [Validators.required] }),
      summary: new FormControl(null, { validators: [Validators.required] }),
      articleDate: new FormControl(null)
    });
  }

  async submit() {
    const article = new Article(this.articleForm.value);
    this.articleService.addArticle(article);
  }
}
