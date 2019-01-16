import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home-countries',
  templateUrl: './home-countries.component.html',
  styleUrls: ['./home-countries.component.css']
})
export class HomeCountriesComponent implements OnInit {
  countries: any;

  constructor(
    private _httpSerivce: HttpService
  ) { }

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    let observable = this._httpSerivce.getAllCountries();
    observable.subscribe(data => {
      if (data['message'] == 'Success') {
        this.countries = data['countries'];
        console.log(this.countries);
      } else {
        console.log(data, 'No countries found');
      };
    });
  }
}
