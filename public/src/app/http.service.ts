import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _httpService: HttpClient) { }

  getAllCountries() {
    return this._httpService.get('/db/v1/futbalTeams/countries');
  }

  getAllOrganizationsForCountry(country: any) {
    return this._httpService.get('db/v1/futbalTeams/countries/'+ country +'/organizations');
  }

  getAllTeamsForOrganizations(organization: any) {
    return this._httpService.get('/db/v1/futbalTeams/organizations/'+ organization +'/teams');
  }

  getTeam(ftid: any) {
    return this._httpService.get('db/v1/futbalTeams/teams/'+ ftid);
  }
}
