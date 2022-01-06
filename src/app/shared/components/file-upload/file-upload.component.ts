import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  fileData: any;
  fileName: any;

  @Output() onFileUploaded = new EventEmitter();

  @Input() files = 'image/*';

  @Input() label: string = '';

  @Input() disabled = false;
  @Input() leftAlign = false;
  @Input() enableIcon = false;
  @Input() enableButton = false;

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const target: DataTransfer = (event.target) as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (file: any) => {
      this.onFileUploaded.emit({ localUrl: file.target.result, fileData: this.fileData });
      this.fileName = null;
    };
    if (this.files === '.xlsx') {
      reader.readAsBinaryString(target.files[0]);
    }
    else {
      reader.readAsDataURL(target.files[0]);
    }
    this.fileData = target.files[0];
  }

}
