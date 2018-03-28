import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { TunesComponent } from './tunes/tunes.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full'}, // redirect to signup page
  { path: 'signup', component: SignupComponent}, // will activate the route after the db is ready
  { path: 'tunes', component:TunesComponent} // Using loadChildren to async load the route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
