import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubtopicService} from "../shared/services/subtopic.service";
import {ArticleService} from "../shared/services/article.service";
import {Article} from "../shared/models/article"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImagePickerConf} from "ngp-image-picker";
import {StorageService} from "../shared/services/storage.service";
import {Timeline} from "../shared/models/timeline";
import {ToastMessageService} from "../shared/services";
import {trigger, keyframes, style, animate, transition} from '@angular/animations';
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  animations: [
    trigger('timelineAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.5) translateY(50px)'}),
        animate(
          '1000ms',
          keyframes([
            style({opacity: 1, offset: 0.3}),
            style({transform: 'translateY(0)', offset: 0.6}),
            style({transform: 'scale(1)', offset: 1}),
          ])
        ),
      ]),
    ])
  ]
})

export class TimelineComponent implements OnInit, OnDestroy {

  subtopic: any;
  article: any;
  articleId: any;
  articleForm: any;
  timelineImage: Blob | undefined;
  timelineImageURL: any;
  articleList: any;
  subtopics: any;
  config1: ImagePickerConf = {
    borderRadius: '16px',
    language: 'en',
    compressInitial: true,
    hideDownloadBtn: true,
    width: '100%',
    height: 'auto',
  };
  subtopicName = 'WELCOME';
  subscriptions: Subscription[] = [];
  constructor(public activeRoute: ActivatedRoute,
              public subtopicService: SubtopicService,
              private articleService: ArticleService,
              private modalService: NgbModal,
              private storageService: StorageService,
              private toastService: ToastMessageService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activeRoute.params.subscribe(params => {
      this.articleId = params['id'];
      this.subscriptions.push(this.subtopicService.getSubtopic(this.articleId).subscribe(subtopic => {
        this.subtopic = subtopic;
        this.subtopicName = subtopic[0].subtopicName;
      }));
    }));
    this.initializeArticleForm();
    this.loadTimeline();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  initializeArticleForm() {
    this.articleForm = new FormGroup({
      websiteUrl: new FormControl(null, {validators: [Validators.required]}),
      summary: new FormControl(null, {validators: [Validators.required]}),
      articleDate: new FormControl(null, {validators: [Validators.required]})
    });
  }

  loadTimeline() {
    this.subscriptions.push(this.articleService.getArticle(this.articleId).subscribe(article => {
      this.article = article[0];
      if (this.article) {
        this.articleList = this.article.timeline.sort((a: any, b: any) => {
            return <any>new Date(b.articleDate) - <any>new Date(a.articleDate);
          });
      }
    }));
  }

  async submit(modal: any) {
    const timeline = new Timeline(this.articleForm.value);
    timeline.addedToTimeline = new Date();
    timeline.id = this.storageService.getRandomKey(25);

    // uploading subtopic image
    if (this.timelineImage) {
      const uploadResult = (await this.storageService.uploadSubtopicImage('timeline_images', this.timelineImage, timeline.id));
      this.timelineImageURL = (await uploadResult.ref.getDownloadURL());
      timeline.imageUrl = this.timelineImageURL;
      if (this.article) {
        this.article.timeline.push(timeline);
        this.articleService.updateArticle(this.article);
      } else {
        this.article = new Article({id: this.articleId, timeline: Timeline.toJsonArray([timeline])});
        this.articleService.addArticle(this.article);
      }
      this.articleForm.reset();
      modal.close();
    } else {
      this.toastService.error("Please Upload Image!");
    }
  }

  openLg(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }

  fileUploaded(event: any) {
    this.timelineImageURL = event;
    this.timelineImage = this.storageService.b64toBlob(event);
  }
}
