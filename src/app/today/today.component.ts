import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  lat;
  lon;
  weather;
  locationDeined :boolean = true;
  locationDeinedEnableCity = false;

  constructor( private weatherservice:WeatherService) { }

  ngOnInit(): void {

    this.getLocation();
  }

  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success) =>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherservice.getWeatherDataByCoords(this.lat, this.lon)
        .subscribe(data =>{
          this.weather = data;
        });
      },(error)=>{
        if(error.code == error.PERMISSION_DENIED){
          this.locationDeined =false;
          this.locationDeinedEnableCity =true;
        }
      })
    }
  }
  getCity(city){
 this.weatherservice.getWeatherDataByCityName(city)
 .subscribe((data :any) =>{
   this.weather =data;

   this.lat = data.coord.lat;
   this.lon = data.coord.lon;
 });
  }

  getCoords(event){
    console.log(event);
    
    this.lat = event.coords.lat;
    this.lon = event.coords.lon;

    this.weatherservice.getWeatherDataByCoords(this.lat,this.lon)
    .subscribe(data =>{
      this.weather =data;
    })
  }
}
