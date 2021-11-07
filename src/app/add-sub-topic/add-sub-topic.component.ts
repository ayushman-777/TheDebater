import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../shared/services/storage.service";
import {Subtopic} from "../shared/models/subtopic";
import {SubtopicService} from "../shared/services/subtopic.service";
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {ToastMessageService} from "../shared/services";

@Component({
  selector: 'app-add-sub-topic',
  templateUrl: 'add-sub-topic.component.html'
})
export class AddSubTopicComponent implements OnInit {
  subtopicImage: Blob | undefined;
  subtopicImageURL: any;
  subtopicForm: any;
  topics = [
    'World',
    'Local News',
    'Technology',
    'Business',
    'Health'
  ]

  constructor(private storageService: StorageService,
              private subtopicService :SubtopicService,
              private calendar: NgbCalendar,
              private toastService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.initializeSubtopicForm();
  }

  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

  initializeSubtopicForm() {
    this.subtopicForm = new FormGroup({
      topicName: new FormControl(null, { validators: [Validators.required] }),
      subtopicName: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      dateRelatedToTopic: new FormControl(null)
    });
  }

  fileUploaded(event: any) {
    this.subtopicImageURL = event.localUrl;
    this.subtopicImage = event.fileData;
  }

  get fileUploadLabel() {
    return this.subtopicImageURL ? 'Change Logo' : 'Upload Logo';
  }

  async submit() {
    const subtopic = new Subtopic(this.subtopicForm.value);
    subtopic.id = this.getRandomKey(25);
    subtopic.dateAdded = new Date();

    // uploading subtopic image
    if (this.subtopicImage){
      const uploadResult = (await this.storageService.uploadSubtopicImage(this.subtopicImage, subtopic.id));
      this.subtopicImageURL = (await uploadResult.ref.getDownloadURL());
      subtopic.imageUrl = this.subtopicImageURL;
      this.subtopicService.addSubtopic(subtopic);
    } else {
      this.toastService.error("Please Upload Image!");
    }
  }

  getRandomKey(length: number) {
    const tokens = 'AaBcDeEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    const tokenLength = tokens.length;
    let key = '';
    for (let i = 0; i < length; i++) {
      key = key + tokens.charAt(Math.ceil(Math.random() * tokenLength));
    }
    return key;
  }
}
