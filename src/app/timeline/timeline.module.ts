import {NgModule} from '@angular/core';
import {TimelineComponent} from "./timeline.component";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {NgpImagePickerModule} from "ngp-image-picker";
import {TimelineRoutingModule} from "./timeline-routing.module";


@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    NgpImagePickerModule,
    TimelineRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class TimelineModule {
}
