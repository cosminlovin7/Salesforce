import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import getCertifications from '@salesforce/apex/CertificationGetter.getCertifications';

const columns = [
    { label: 'Certification Name', fieldName: 'Name'},
    { label: 'Session', 
      fieldName: 'SessionId', 
      type: 'url', 
      typeAttributes: {label: { fieldName: 'SessionName' }, target: '_blank'}},
    { label: 'Course',
      fieldName: 'CourseId',
      type: 'url',
      typeAttributes: {label: { fieldName: 'CourseName' }, target: '_blank'}},
];

export default class Certifications extends LightningElement {
    @api recordId;
    consData
    columns = columns;

    @wire(getRecord, { recordId: '$recordId' })
    attendeeId;

    @wire(getCertifications, { attendeeId: '$recordId' })
    certificationRecord({error, data}) {
        if (data) {
            let tempList = []; 
            
            data.forEach((record) => {
                let tempCertif = Object.assign({}, record);  
                tempCertif.SessionId = '/' + tempCertif.Session__c;
                tempCertif.CourseId = '/' + tempCertif.Course__c;
               
                tempList.push(tempCertif);
            });
            
            this.consData = tempList;
        }
    }
}