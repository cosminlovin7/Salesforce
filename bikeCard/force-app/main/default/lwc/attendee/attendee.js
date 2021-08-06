import {LightningElement, api,track, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';

const fields = [
    'Attendee.Name',
    'Attendee.Certification__c',
    'Attendee.Certification__r.Badge'
];

export default class Recordex extends LightningElement {
    @api recordId;
    @track attendee;
    @wire(getRecord, {recordId: '$recordId', fields})
    attendee;

    get name() {
        return this.attendee.data.fields.Name.value;
    }

    get certification() {
        return this.attendee.data.fields.Certification__c.value;
    }

    get badge() {
        return this.attendee.date.fields.Certification__r.Badge.value;
    }
}