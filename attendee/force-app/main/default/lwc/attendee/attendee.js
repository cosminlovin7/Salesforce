/*eslint no-console: “error”*/
import {LightningElement, api, track, wire} from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Attendee__c.Name';
import getCourseInfo from '@salesforce/apex/CertificationController.getCourseInfo';

// export default class Example extends LightningElement {
//     @wire(getRecord, { recordId: '', fields: [NAME_FIELD, INDUSTRY_FIELD], optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD] })
//     account;

export default class Recordex extends LightningElement {
    @api recordId;
    @track attendee;    
    @wire(getRecord, {recordId: '$recordId', fields: [NAME_FIELD]})
    attendee;

    @wire(getCourseInfo, { attendeeId: '$recordId' })
    certification;

    connectedCallback(){
        console.error('recordId', this.recordId);
    }

    get name() {
        return getFieldValue(this.attendee.data, NAME_FIELD);
    }

    getBadges() {
        for(crtf in certification) {
            this.template.querySelector('.container').appendChild(crtf.Course__r.Badge__c);
        }
    }
}