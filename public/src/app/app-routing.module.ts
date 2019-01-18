import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teams/:id', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
