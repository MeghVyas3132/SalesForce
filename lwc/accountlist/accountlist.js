import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/aa.getAccounts';
export default class AccountList extends LightningElement {
   accounts;
   error;
   @wire(getAccounts)
   wiredAccounts({ error, data }) {
       if (data) {
           this.accounts = data;
           this.error = undefined;
       } else if (error) {
           this.error = error;
           this.accounts = undefined;
       }
   }
}