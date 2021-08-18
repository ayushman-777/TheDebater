import { Component } from '@angular/core';
import {ToastMessageService} from "./shared/services";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'TheDebater';
  constructor(private toast: ToastMessageService,private db: AngularFirestore) {
    this.toast.error("Welcome to The Debater");
    const things = db.collection('things').valueChanges();
    things.subscribe(console.log);
  }
}
