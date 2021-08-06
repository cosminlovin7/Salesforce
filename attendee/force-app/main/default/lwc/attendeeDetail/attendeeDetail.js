import { LightningElement, wire, api, track} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getAttendee from '@salesforce/apex/AttendeeController.getAttendee';

import NAME_FIELD from '@salesforce/schema/Attendee__c.Name';
import EMAIL_FIELD from '@salesforce/schema/Attendee__c.Email__c';
import BIRTHDATE_FIELD from '@salesforce/schema/Attendee__c.Birthdate__c';
import CNP_FIELD from '@salesforce/schema/Attendee__c.CNP__c';

export default class AttendeeDetail extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId : '$recordId', fields: [NAME_FIELD, EMAIL_FIELD, BIRTHDATE_FIELD, CNP_FIELD]})
    attendee;

    connectedCallback(){
        console.error('recordId', this.recordId);
    }

    get name() {
        return getFieldValue(this.attendee.data, NAME_FIELD);
    }

    get email() {
        return getFieldValue(this.attendee.data, EMAIL_FIELD);
    }

    get birthdate() {
        return getFieldValue(this.attendee.data, BIRTHDATE_FIELD);
    }

    get cnp() {
        return getFieldValue(this.attendee.data, CNP_FIELD);
    }
}