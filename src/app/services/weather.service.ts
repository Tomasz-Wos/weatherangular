import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) {

   }

  getWeather(city: string, units: string){
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + 
      city + 
      '&appid=3b3be292abc93b8c98c17f2348e8f8a6&units=' +
      units)
  }
}
