import { LightningElement, wire, api, track} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getPhotoUrl from '@salesforce/apex/AttendeeController.getPhotoUrl'

import NAME_FIELD from '@salesforce/schema/Attendee__c.Name';
import EMAIL_FIELD from '@salesforce/schema/Attendee__c.Email__c';
import BIRTHDATE_FIELD from '@salesforce/schema/Attendee__c.Birthdate__c';
import CNP_FIELD from '@salesforce/schema/Attendee__c.CNP__c';
import PHOTO_URL from '@salesforce/schema/Attendee__c.UserId__r.MediumPhotoUrl';
import DEFAULT_PHOTO from '@salesforce/schema/Attendee__c.Profile_picture__c';

export default class AttendeeDetail extends LightningElement {
    @api recordId;
    photoUrl;

    @wire(getRecord, { recordId : '$recordId', fields: [NAME_FIELD, EMAIL_FIELD, BIRTHDATE_FIELD, CNP_FIELD, PHOTO_URL]})
    attendee;

    @wire(getPhotoUrl, { attendeeId : '$recordId' })
    photo({error, data}) {
        if (data) {
            this.photoUrl = data;
        }
    }

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

    get photo_url() {
        const photoUrl = getFieldValue(this.attendee.data, PHOTO_URL);
        if (photoUrl == null) {
            return getFieldValue(this.attendee.data, DEFAULT_PHOTO);
        } else {
            return photoUrl;
        }
    }
}