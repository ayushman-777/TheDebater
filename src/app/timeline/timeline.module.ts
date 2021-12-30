import {NgModule} from '@angular/core';
import {TimelineComponent} from "./timeline.component";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class TimelineModule {
}
