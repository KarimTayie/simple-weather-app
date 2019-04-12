import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from './core/current-weather/current-weather.component';
import { ForecastComponent } from './core/forecast/forecast.component';

const routes: Routes = [
  { path: '', redirectTo: '/current-weather', pathMatch: 'full' },
  { path: 'current-weather', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
