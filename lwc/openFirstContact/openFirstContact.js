import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getFirstContactId from '@salesforce/apex/OpenContactController.getFirstContactId';
export default class OpenFirstContact extends NavigationMixin(LightningElement) {
   @api recordId;
   handleClick() {
       getFirstContactId({ accountId: this.recordId })
           .then(contactId => {
               if (contactId) {
                   this[NavigationMixin.Navigate]({
                       type: 'standard__recordPage',
                       attributes: {
                           recordId: contactId,
                           objectApiName: 'Contact',
                           actionName: 'view'
                       }
                   });
               } else {
                   alert('No Contact found for this Account');
               }
           })
           .catch(error => {
               console.error('Error:', error);
               alert('Error fetching Contact');
           });
   }
}