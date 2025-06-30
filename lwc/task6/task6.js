import { LightningElement, track } from 'lwc';
import getContactsByAccountName from '@salesforce/apex/AccountContactController.getContactsByAccountName';
export default class AccountContactSearch extends LightningElement {
   @track accountName = '';
   @track contacts;
   @track error;
   columns = [
       { label: 'First Name', fieldName: 'FirstName' },
       { label: 'Last Name', fieldName: 'LastName' },
       { label: 'Email', fieldName: 'Email' },
       { label: 'Phone', fieldName: 'Phone' }
   ];
   handleInput(event) {
       this.accountName = event.target.value;
   }
   handleSearch() {
       getContactsByAccountName({ accountName: this.accountName })
           .then(result => {
               this.contacts = result;
               this.error = undefined;
           })
           .catch(error => {
               this.error = error.body.message;
               this.contacts = undefined;
           });
   }
}