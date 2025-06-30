import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateContactForm extends LightningElement {
   handleSuccess(event) {
       this.dispatchEvent(
           new ShowToastEvent({
               title: "Success",
               message: "Contact created with ID: " + event.detail.id,
               variant: "success"
           })
       );
   }

}