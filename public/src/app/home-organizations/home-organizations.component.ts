import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home-organizations',
  templateUrl: './home-organizations.component.html',
  styleUrls: ['./home-organizations.component.css']
})
export class HomeOrganizationsComponent implements OnInit {
  @Input() selectedCountry: string;
  organizations: any;
  selectedOrganization: string;
  teams_enable: boolean = false;

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAllOrganizations();
  }

  getAllOrganizations() {
    let observable = this._httpService.getAllOrganizationsForCountry(this.selectedCountry);
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.organizations = data['organizations'];
        console.log(this.organizations);
      } else {
        console.log(data, 'No organizations found');
      };
    });
  }

  organizationSelected(oidx: number) {
    this.selectedOrganization = this.organizations[oidx];
    this.teams_enable = true;
  }
}
