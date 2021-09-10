import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserRole } from './shared/models';
// import { RouteGuard } from './shared/auth-guard/route-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
