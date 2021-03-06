import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

url = 'https://api.openweathermap.org/data/2.5/weather';
apikey = 'ba71d0ed1bc72d8f23452db1efb0f042';

  constructor(private http: HttpClient) { }

getWeatherDataByCoords(lat,lon){
  let params = new HttpParams()
  .set('lat',lat)
  .set('lon',lon)
  .set('units','imperial')
  .set('appid', this.apikey)

  return this.http.get(this.url,{params})
}

getWeatherDataByCityName(city : string){
  let params = new HttpParams()
  .set('q',city)
  .set('units','imerial')
  .set('appid',this.apikey)

  return this.http.get(this.url , {params});
}

}