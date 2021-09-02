import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
// import { UserRole } from './shared/models';
// import { RouteGuard } from './shared/auth-guard/route-guard';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
