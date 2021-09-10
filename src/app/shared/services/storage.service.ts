import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';

@Injectable()
export class StorageService {

    constructor(private fireStorage: AngularFireStorage) { }

    uploadSubtopicImage(file: Blob, fileName: string): UploadTask {
        return this.fireStorage.ref('subtopic_image').child(fileName).put(file);
    }

}
