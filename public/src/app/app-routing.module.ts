import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeCountriesComponent } from './home-countries/home-countries.component';
import { HomeOrganizationsComponent } from './home-organizations/home-organizations.component';
import { HomeTeamsComponent } from './home-teams/home-teams.component';

const routes: Routes = [
  {path: '', component: HomeCountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
