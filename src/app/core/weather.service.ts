import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Weatherapi } from './weatherapi';
import { Forecastapi } from './forecastapi';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Weather api key
  appId = '5d8fa9eb27b1deb60e2e387b21132a09';
  units = 'metric';

  // EventEmitter for each api end point
  weatherEventEmitter: EventEmitter<Weatherapi> = new EventEmitter();
  forecastEventEmitter: EventEmitter<Forecastapi> = new EventEmitter();


  constructor(
    private http: HttpClient
  ) { }

  getCurrentWeatherByCityName(cityName: string = 'Cairo', lang: string = 'en'): Observable<Weatherapi> {
    return this.http.get<Weatherapi>
    (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.appId}&units=${this.units}&lang=${lang}`);
  }

  getForecastByCityName(cityName: string = 'Cairo', lang: string = 'en'): Observable<Forecastapi> {
    return this.http.get<Forecastapi>
    (`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.appId}&units=${this.units}&lang=${lang}`);
  }

  getWeatherEventEmitter() {
    return this.weatherEventEmitter;
  }

  getForecastEventEmitter() {
    return this.forecastEventEmitter;
  }
}
