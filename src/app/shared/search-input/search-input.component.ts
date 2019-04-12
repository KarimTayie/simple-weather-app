import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { WeatherService } from '../../core/weather.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() api: string;
  @ViewChild('sForm') searchFormDirective: NgForm;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.api === 'forecast') {
      this.weatherService.getForecastByCityName(this.searchForm.value.searchInput, this.translateService.currentLang).subscribe(
        data => {
          this.weatherService.getForecastEventEmitter().emit(data);
        }
      );
    } else if (this.api === 'currentWeather') {
      this.weatherService.getCurrentWeatherByCityName(this.searchForm.value.searchInput, this.translateService.currentLang).subscribe(
        data => {
          this.weatherService.getWeatherEventEmitter().emit(data);
        }
      );
    }
  }

}
