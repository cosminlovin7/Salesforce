import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getCertifications from '@salesforce/apex/CertificationGetter.getCertifications';
import dispCertif from '@salesforce/apex/CertificationGetter.dispCertif';

export default class CustomAttendee extends LightningElement {
    @api recordId;
    slides;
    displayCertifications;

    @wire(getRecord, {recordId: '$recordId'})
    attendee;

    @wire(dispCertif, {attendeeId: '$recordId'})
    display({error, data}) {
        if (data) {
            this.displayCertifications = data;
        }
    }

    @wire(getCertifications, {attendeeId: '$recordId'})
    certifications({error, data}) {
        let tempArray = [];
        if (data) {
            data.forEach(record => tempArray.push({object: record}));
        }

        this.slides = tempArray;
    }

    connectedCallback() {
        console.error('certificationAllow', this.displayCertifications);
    }
}