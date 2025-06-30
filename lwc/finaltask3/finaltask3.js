import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ContactListDeleter extends LightningElement {
   @track contacts;
   @track error;
   @wire(getContacts)
   wiredContacts({ data, error }) {
       if (data) {
           this.contacts = data;
           this.error = undefined;
       } else if (error) {
           this.error = 'Error loading contacts';
           this.contacts = undefined;
       }
   }
   handleDelete(event) {
       const contactId = event.target.dataset.id;
       deleteRecord(contactId)
           .then(() => {
               this.showToast('Success', 'Contact deleted successfully', 'success');
               // Remove the deleted contact from the list without refreshing
               this.contacts = this.contacts.filter(con => con.Id !== contactId);
           })
           .catch(error => {
               this.showToast('Error', 'Failed to delete contact', 'error');
               console.error(error);
           });
   }
   showToast(title, message, variant) {
       this.dispatchEvent(
           new ShowToastEvent({
               title,
               message,
               variant,
           })
       );
   }
}