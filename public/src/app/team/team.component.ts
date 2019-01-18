import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  ftid: any;
  team: any;
  homeAway: boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getTeam(params['id']);
    });
  }

  getTeam(ftid: any) {
    this.ftid = ftid;
    let observable = this._httpService.getTeam(this.ftid);
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.team = data['team'];
        this.homeAway = data['team']['home'];
        console.log(data['team']);
      } else {
        console.log(data, 'Team not found');
      };
    });
  }
}
