import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home-countries',
  templateUrl: './home-countries.component.html',
  styleUrls: ['./home-countries.component.css']
})
export class HomeCountriesComponent implements OnInit {
  countries: any;
  org_enable: boolean = false;
  selectedCountry: string = "";

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    let observable = this.httpService.getAllCountries();
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.countries = data['countries'];
      } else {
        console.log(data, 'No countries found');
      };
    });
  }

  countrySelected(cidx: number) {
    this.selectedCountry = this.countries[cidx];
    this.org_enable = true;
  }
}
