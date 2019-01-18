import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countries: any;
  organizations: any;
  teams: any;
  org_enable: boolean = false;
  teams_enable: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.countries = null;
    this.getAllCountries();
  }

  ngOnChange() {
    this.countries = null;
    this.getAllCountries();
  }
  
  getAllCountries() {
    this.org_enable = false;
    this.teams_enable = false;
    let observable = this._httpService.getAllCountries();
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.countries = data['countries'];
      } else {
        console.log(data, 'No countries found');
      };
    });
  }

  countrySelected(cidx: number) {
    this.org_enable = null;
    this.teams_enable = null;
    this.organizations = null;
    this.teams = null;
    let selectedCountry = this.countries[cidx];
    let observable = this._httpService.getAllOrganizationsForCountry(selectedCountry);
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.organizations = data['organizations'];
        this.org_enable = true;
      } else {
        console.log(data, 'No organizations found for '+ selectedCountry);
      };
    });
  }

  organizationSelected(oidx: number) {
    this.teams_enable = null;
    this.teams = null;
    let selectedOrganization = this.organizations[oidx];
    let observable = this._httpService.getAllTeamsForOrganizations(selectedOrganization);
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.teams = data['teams'];
        this.teams_enable = true;
      } else {
        console.log(data, 'No teams found for '+ selectedOrganization);
      };
    });
  }

  teamSelected(tidx: number) {
    let ftid = this.teams[tidx]['_id'];
    this._router.navigate(['teams/'+ ftid]);
  }
}
