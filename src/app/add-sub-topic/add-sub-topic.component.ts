import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../shared/services/storage.service";
import {Subtopic} from "../shared/models/subtopic";
import {SubtopicService} from "../shared/services/subtopic.service";
import {ToastMessageService} from "../shared/services";
import {ImagePickerConf} from "ngp-image-picker";

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
              private toastService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.initializeSubtopicForm();
  }

  config1: ImagePickerConf = {
    borderRadius: '16px',
    language: 'en',
    compressInitial: true,
    hideDownloadBtn: true,
    width: '100%',
    height: 'auto',
  };
  initializeSubtopicForm() {
    this.subtopicForm = new FormGroup({
      topicName: new FormControl(null, { validators: [Validators.required] }),
      subtopicName: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      dateRelatedToTopic: new FormControl(null)
    });
  }

  fileUploaded(event: any) {
    this.subtopicImageURL = event;
    this.subtopicImage = this.storageService.b64toBlob(event);
  }

  get fileUploadLabel() {
    return this.subtopicImageURL ? 'Change Logo' : 'Upload Logo';
  }

  async submit() {
    if (this.subtopicImage){
      const subtopic = new Subtopic(this.subtopicForm.value);
      subtopic.id = this.storageService.getRandomKey(25);
      subtopic.dateAdded = new Date();
      const uploadResult = (await this.storageService.uploadSubtopicImage('subtopic_image', this.subtopicImage, subtopic.id));
      this.subtopicImageURL = (await uploadResult.ref.getDownloadURL());
      subtopic.imageUrl = this.subtopicImageURL;
      this.subtopicService.addSubtopic(subtopic);
    } else {
      this.toastService.error("Please Upload Image!");
    }
  }
}
