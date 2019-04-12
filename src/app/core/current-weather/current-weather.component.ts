import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { WeatherService } from '../weather.service';
import { Weatherapi } from '../weatherapi';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentWeatherData: Weatherapi;
  lastUpdated: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    // Getting lang from the localStorage
    const lang = localStorage.getItem('lang');
    this.getCurrentWeatherData(lang);

    this.weatherService.getWeatherEventEmitter().subscribe(
      (data: Weatherapi) => {
        this.currentWeatherData = data;

        this.resetLastUpdated();
      }
    );

    // Subscribing on langauge change for getting current weather with the correct language
    this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.getCurrentWeatherData(event.lang);
      }
    );
  }

  // Get current Weather data
  getCurrentWeatherData(lang: string = 'en') {
    if (this.currentWeatherData) {
      const cityName = this.currentWeatherData.name;
      this.weatherService.getCurrentWeatherByCityName(cityName, lang).subscribe(
        data => {
          this.currentWeatherData = data;
        }
      );
    } else {
      this.weatherService.getCurrentWeatherByCityName(undefined, lang).subscribe(
        data => {
          this.currentWeatherData = data;
        }
      );
    }
    this.resetLastUpdated();
  }

  resetLastUpdated() {
    this.lastUpdated = new Date();
  }

}
