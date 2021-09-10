import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddSubTopicComponent} from "./add-sub-topic.component";

const routers: Routes = [
  { path: '', component: AddSubTopicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class AddSubTopicRoutingModule { }
