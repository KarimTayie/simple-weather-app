import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { WeatherService } from '../weather.service';
import { Forecastapi } from '../forecastapi';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecastData: Forecastapi;
  lastUpdated: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    const lang = localStorage.getItem('lang');
    this.getForecastData(lang);

    this.weatherService.getForecastEventEmitter().subscribe(
      (data: Forecastapi) => {
        this.forecastData = data;

        this.resetLastUpdated();
      }
    );

    this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.getForecastData(event.lang);
      }
    );
  }

  getForecastData(lang: string = 'en') {
    if (this.forecastData) {
      const cityName = this.forecastData.city.name;
      this.weatherService.getForecastByCityName(cityName, lang).subscribe(
        data => {
          this.forecastData = data;
        }
      );
    } else {
      this.weatherService.getForecastByCityName(undefined, lang).subscribe(
        data => {
          this.forecastData = data;
        }
      );
    }
    this.resetLastUpdated();
  }

  resetLastUpdated() {
    this.lastUpdated = new Date();
  }

}
