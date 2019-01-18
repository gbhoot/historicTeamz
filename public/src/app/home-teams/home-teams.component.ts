import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home-teams',
  templateUrl: './home-teams.component.html',
  styleUrls: ['./home-teams.component.css']
})
export class HomeTeamsComponent implements OnInit {
  @Input() selectedOrg: string;
  teams: any;

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    let observable = this._httpService.getAllTeamsForOrganizations(this.selectedOrg);
    observable.subscribe(data => {
      if (data['message'] = 'Success') {
        this.teams = data['teams'];
      } else {
        console.log(data, 'No teams found');
      };
    });
  }

  teamSelected(tidx: number) {
    let selectedTeam = this.teams[tidx];
    console.log(selectedTeam);
  }
}
