import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EditContactForm extends LightningElement {
   @api recordId; // Set this from parent or test with hardcoded ID
   handleSuccess(event) {
       this.dispatchEvent(
           new ShowToastEvent({
               title: 'Success',
               message: 'Contact updated',
               variant: 'success'
           })
       );
   }
}