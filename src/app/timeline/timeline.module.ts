import {NgModule} from '@angular/core';
import {TimelineComponent} from "./timeline.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class TimelineModule {
}
