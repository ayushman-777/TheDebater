import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  subtopic: any;
  article: any;
  articleId: any;
  articleForm: any;
  timelineImage: Blob | undefined;
  timelineImageURL: any;
  config1: ImagePickerConf = {
    borderRadius: '16px',
    language: 'en',
    compressInitial: true,
    hideDownloadBtn: true,
    width: '100%',
    height: 'auto',
  };

  constructor(public activeRoute: ActivatedRoute,
              public subtopicService: SubtopicService,
              private articleService: ArticleService,
              private modalService: NgbModal,
              private storageService: StorageService,
              private toastService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.articleId = params['id'];
      this.subtopicService.getSubtopic(this.articleId).subscribe(subtopic => {
        this.subtopic = subtopic;
      });
    });
    this.initializeArticleForm();
    this.loadTimeline();
  }

  initializeArticleForm() {
    this.articleForm = new FormGroup({
      websiteUrl: new FormControl(null, {validators: [Validators.required]}),
      summary: new FormControl(null, {validators: [Validators.required]}),
      articleDate: new FormControl(null, {validators: [Validators.required]})
    });
  }

  loadTimeline() {
    this.articleService.getArticle(this.articleId).subscribe(article => {
      this.article = article[0];
      console.log(this.article);
    });
  }

  async submit() {
    const timeline = new Timeline(this.articleForm.value);
    timeline.addedToTimeline = new Date();
    timeline.id = this.storageService.getRandomKey(25);

    // uploading subtopic image
    if (this.timelineImage) {
      const uploadResult = (await this.storageService.uploadSubtopicImage('timeline_images', this.timelineImage, this.articleId));
      this.timelineImageURL = (await uploadResult.ref.getDownloadURL());
      timeline.imageUrl = this.timelineImageURL;
      if (this.article) {
        this.article.timeline.push(timeline);
        this.articleService.updateArticle(this.article);
      }
      else {
        this.article = new Article({id: this.articleId, timeline: Timeline.toJsonArray([timeline])});
        this.articleService.addArticle(this.article);
      }
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
