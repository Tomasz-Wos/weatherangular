import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  myWeather: any
  temperature: number = -300
  feelsTemperature: number = -300
  pressure: number = 0
  humidity: number = 0
  summary: string = ''
  iconURL: string = ''
  city: string = 'Wrocław'
  units: string = 'metric'

  constructor(private weatherService: WeatherService){  }

  ngOnInit(): void {
    this.getWeather(this.city, this.units)
  }

  getWeather(city: string, units: string): void{
    this.weatherService.getWeather(city, units).subscribe({
      next: (res) => {
        this.myWeather = res
        console.log(this.myWeather)
        this.temperature = this.myWeather.main.temp
        this.feelsTemperature = this.myWeather.main.feels_like
        this.pressure = this.myWeather.main.pressure
        this.humidity = this.myWeather.main.humidity
        this.summary = this.myWeather.weather[0].main

        this.iconURL ='https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png'
      },
      
      error: (error)=>console.error(error.message),

      complete: ()=>console.info('API call complete')
    })
  }

  onRadioButtonChange(){
    if(this.units=='metric'){
      this.units = 'imperial'
    }
    else{
      this.units='metric'
    }
    this.getWeather(this.city, this.units)
  }
}
