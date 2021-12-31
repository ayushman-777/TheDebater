import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./timeline.component";

const routers: Routes = [
  { path: '', component: TimelineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
