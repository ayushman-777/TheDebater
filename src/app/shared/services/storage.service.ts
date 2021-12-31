import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadTask} from '@angular/fire/storage/interfaces';

@Injectable()
export class StorageService {

  constructor(private fireStorage: AngularFireStorage) {
  }

  uploadSubtopicImage(path: string, file: Blob, fileName: string): UploadTask {
    return this.fireStorage.ref(path).child(fileName).put(file);
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

  b64toBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
}
