import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

export default class OpportunityFilter extends NavigationMixin(LightningElement) {
    @track opportunities = [];
    @track error;

    columns = [
        { label: 'Opportunity Name', fieldName: 'Name' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Email', fieldName: 'ContactEmail__c', type: 'email' },
        {
            type: 'button',
            typeAttributes: {
                label: 'View Account',
                name: 'view_Account',
                title: 'View Account',
                variant: 'brand',
                disabled: false
            }
        }
    ];

    @wire(getOpportunities)
    wiredOpportunities({ error, data }) {
        if (data) {
            this.opportunities = data;
        } else if (error) {
            this.error = error;
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'view_Account') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.AccountId,
                    objectApiName: 'Account',
                    actionName: 'view'
                }
            });
        }
    }
}
