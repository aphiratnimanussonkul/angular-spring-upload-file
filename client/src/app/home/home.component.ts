import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  downloadURL: Observable<String>;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  uploadPic(event) {
    // + this.dateAsYYYYMMDDHHNNSS(new Date())
    this.ref = this.storage.ref('Picture_' + this.dateAsYYYYMMDDHHNNSS(new Date()));
    this.task = this.ref.put(event.target.files[0]);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // this.uploadProgress = this.task.percentageChanges();
    this.downloadURL =  this.ref.getDownloadURL();
  }
  dateAsYYYYMMDDHHNNSS(date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      + '-' + this.leftpad(date.getHours(), 2)
      + '-' + this.leftpad(date.getMinutes(), 2)
      + '-' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
