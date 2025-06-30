import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/WeatherController.getWeather';
export default class WeatherApp extends LightningElement {
   city = '';
   @track weather;
   @track error;
   handleCityChange(event) {
       this.city = event.target.value;
   }
   getWeather() {
       this.error = null;
       this.weather = null;
       if (!this.city) {
           this.error = 'Please enter a city name.';
           return;
       }
       getWeather({ city: this.city })
           .then(result => {
               this.weather = result;
           })
           .catch(err => {
               this.error = err.body.message || 'Error fetching weather.';
           });
   }
}