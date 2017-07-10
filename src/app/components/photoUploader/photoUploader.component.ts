import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {NgUploaderOptions } from 'ngx-uploader';
// import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'photo-uploader',
  styleUrls: ['./photoUploader.scss'],
  templateUrl: './photoUploader.html',
})
export class PhotoUploader {

  @Input() defaultPicture: string = '';
  @Input() picture: string = '';

  @Input() uploaderOptions: NgUploaderOptions = { url: '' };
  @Input() canDelete: boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload: ElementRef;

  public uploadInProgress: boolean;

  constructor(private renderer: Renderer) {
  }

  beforeUpload(uploadingFile): void {
    const files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
    }
  }

  bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture(): boolean {
    this.picture = '';
    return false;
  }

  _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (event.target as any).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data): void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  _canUploadOnServer(): boolean {
    return true
  }
//   formData: FormData;
//   files: UploadFile[];
//   uploadInput: EventEmitter<UploadInput>;
//   humanizeBytes: Function;
//   dragOver: boolean;
//
//   constructor() {
//     this.files = []; // local uploading files array
//     this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
//     this.humanizeBytes = humanizeBytes;
//   }
//
//   onUploadOutput(output: UploadOutput): void {
//     console.log(output); // lets output to see what's going on in the console
//
//     if (output.type === 'allAddedToQueue') { // when all files added in queue
//       // uncomment this if you want to auto upload files when added
//       // const event: UploadInput = {
//       //   type: 'uploadAll',
//       //   url: '/upload',
//       //   method: 'POST',
//       //   data: { foo: 'bar' },
//       //   concurrency: 0
//       // };
//       // this.uploadInput.emit(event);
//     } else if (output.type === 'addedToQueue') {
//       this.files.push(output.file); // add file to array when added
//     } else if (output.type === 'uploading') {
//       // update current data in files array for uploading file
//       const index = this.files.findIndex(file => file.id === output.file.id);
//       this.files[index] = output.file;
//     } else if (output.type === 'removed') {
//       // remove file from array when removed
//       this.files = this.files.filter((file: UploadFile) => file !== output.file);
//     } else if (output.type === 'dragOver') { // drag over event
//       this.dragOver = true;
//     } else if (output.type === 'dragOut') { // drag out event
//       this.dragOver = false;
//     } else if (output.type === 'drop') { // on drop event
//       this.dragOver = false;
//     }
//   }
//
//   startUpload(): void {  // manually start uploading
//     const event: UploadInput = {
//       type: 'uploadAll',
//       url: '/upload',
//       method: 'POST',
//       data: { foo: 'bar' },
//       concurrency: 1 // set sequential uploading of files with concurrency 1
//     }
//
//     this.uploadInput.emit(event);
//   }
//
//   cancelUpload(id: string): void {
//     this.uploadInput.emit({ type: 'cancel', id: id });
//   }
// }
}
