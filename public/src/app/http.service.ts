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

  getAllOrganizationsForCountry(cid: any) {
    return this._httpService.get('db/v1/futbalTeams/countries/'+ cid +'/organizations');
  }

  getAllTeamsForOrganizations(oid: any) {
    return this._httpService.get('/db/v1/futbalTeams/organizations/'+ oid +'/teams');
  }

  getTeam(ftid: any) {
    return this._httpService.get('db/v1/futbalTeams/'+ ftid);
  }
}
