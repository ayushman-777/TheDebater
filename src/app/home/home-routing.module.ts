import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {AdminGuard} from "../shared/auth-guard/admin.guard";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'home'},
      {path: 'world'},
      {path: 'india'},
      {path: 'technology'},
      {path: 'business'},
      {path: 'health'},
      {path: 'science'},
      {path: 'sports'},
      {path: 'entertainment'},
      {path: 'timeline/:id',
      loadChildren: () =>
      import('../timeline/timeline.module').then((module) => module.TimelineModule)
      },
      {
        path: 'addarticle', canActivate: [AdminGuard],
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
