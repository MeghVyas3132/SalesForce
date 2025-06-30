import { LightningElement, track } from 'lwc';
import getCryptoData from '@salesforce/apex/CryptoTrackerService.getCryptoData';
export default class CryptoTracker extends LightningElement {
   @track cryptoList;
   @track error;
   @track loading = true;
   connectedCallback() {
       getCryptoData()
           .then(result => {
               const data = JSON.parse(result);
               this.cryptoList = Object.keys(data).map((key, index) => {
                   const name = key.charAt(0).toUpperCase() + key.slice(1);
                   const price = data[key].usd;
                   const change = data[key].usd_24h_change.toFixed(2);
                   return {
                       name,
                       price,
                       change,
                       changeClass: change >= 0 ? 'positive fade-in' : 'negative fade-in'
                   };
               });
               this.loading = false;
           })
           .catch(err => {
               this.error = true;
               this.loading = false;
               console.error(err);
           });
   }
}