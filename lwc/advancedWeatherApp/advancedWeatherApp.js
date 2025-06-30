import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/WeatherController.getWeather';

export default class WeatherApp extends LightningElement {
    @track city = '';
    @track weather;
    @track weatherDescription = ''; // ✅ Initialize the property
    @track error;

    handleCityChange(event) {
        this.city = event.target.value;
    }

    async fetchWeather() {
        // Reset state before fetching
        this.weather = null;
        this.error = null;
        this.weatherDescription = '';

        if (!this.city) {
            this.error = 'Please enter a city.';
            return;
        }

        try {
            const res = await getWeather({ city: this.city });
            this.weather = JSON.parse(res);
            // Assign the description from the API response
            this.weatherDescription = this.weather.weather[0].description;
        } catch (e) {
            this.error = 'Failed to retrieve weather. ' + (e.body?.message || '');
        }
    }

    get tempCelsius() {
        return this.weather
            ? Math.round(this.weather.main.temp - 273.15)
            : '';
    }
}
