import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'home'},
      {path: 'world'},
      {path: 'localnews'},
      {path: 'technology'},
      {path: 'busineess'},
      {path: 'health'},
      {path: 'timeline/:id',
      loadChildren: () =>
      import('../timeline/timeline.module').then((module) => module.TimelineModule)
      },
      {
        path: 'addsubtopic',
        loadChildren: () =>
          import('../add-sub-topic/add-sub-topic.module').then((module) => module.AddSubTopicModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
