import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-add-sub-topic',
  templateUrl: 'add-sub-topic.component.html'
})
export class AddSubTopicComponent implements OnInit {
  subtopicImage: Blob | undefined;
  subtopicImageURL: string | undefined;
  subtopicForm: any;
  topics = [
    'World',
    'Local News',
    'Technology',
    'Business',
    'Health'
  ]

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.initializeSubtopicForm();
  }

  initializeSubtopicForm() {
    this.subtopicForm = new FormGroup({
      topicName: new FormControl(null, { validators: [Validators.required] }),
      subtopicName: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      dateRelatedToTopic: new FormControl(null, { validators: [Validators.required] })
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
    console.log(this.subtopicForm);
    // uploading subtopic image
    if (this.subtopicImage){
      const uploadResult = (await this.storageService.uploadSubtopicImage(this.subtopicImage, 'first'));
      this.subtopicImageURL = (await uploadResult.ref.getDownloadURL());
    }
  }
}
