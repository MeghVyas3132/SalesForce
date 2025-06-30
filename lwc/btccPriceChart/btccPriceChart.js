import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ApexCharts from 'apexcharts.js';
import chartStyle from '@salesforce/resourceUrl/chartStyle';
import chartData from '@salesforce/resourceUrl/chartData';
import Apexcharts from '@salesforce/resourceUrl/Apexcharts';
import chartConfig from '@salesforce/resourceUrl/chartConfig';      

export default class BitcoinChart extends LightningElement {
   chartInitialized = false;
   renderedCallback() {
       if (this.chartInitialized) return;
       this.chartInitialized = true;
       loadScript(this, Apexcharts + '/apexcharts.js')
           .then(() => {
               console.log('ApexCharts loaded');
               this.initializeChart();
           })
           .catch(error => {
               console.error('Script load error:', error);
           });
   }
   initializeChart() {
       console.log("Initializing Chart...");
       const options = {
           chart: {
               type: 'line',
               height: 350
           },
           series: [{
               name: 'Bitcoin Price (USD)',
               data: [27000, 27300, 26850, 27100] // Static example
           }],
           xaxis: {
               categories: ['Mon', 'Tue', 'Wed', 'Thu']
           },
           stroke: {
               curve: 'smooth'
           }
       };
       const chart = new ApexCharts(this.template.querySelector("#chart"), options);
       chart.render();
   }
}