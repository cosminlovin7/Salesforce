import { LightningElement, api, wire} from 'lwc';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import dispSessionChanger from '@salesforce/apex/SessionController.dispSessionChanger';
import getAvailableSessions from '@salesforce/apex/SessionController.getAvailableSessions';
import submitChange from '@salesforce/apex/SessionController.submitChange';
import abortSession from '@salesforce/apex/SessionController.abortSession';

import SESSION_NAME from '@salesforce/schema/Attendee__c.Session__r.Name';

export default class SessionRenew extends LightningElement {
    @api recordId;
    selectedSession;
    sessionsList;
    displaySessionChanger;
    
    //alpha_validation = '[a-zA-Z]*$';

    @wire(getRecord, { recordId : '$recordId', fields : [SESSION_NAME]})
    attendeeInfo;

    @wire(dispSessionChanger, { attendeeId: '$recordId' })
    display({error, data}) {
        if (data) {
            this.displaySessionChanger = data;
        }
    }

    @wire(getAvailableSessions)
    contacts({error, data}) {
        let tempArray = [];
        if (data) {
            for (let key in data) {
                tempArray.push({label:data[key], value:key});
            }
        }
        this.sessionsList = tempArray;
    }

    get sessionName() {
        return getFieldValue(this.attendeeInfo.data, SESSION_NAME);
    }

    handleSessionChange(event) {
        this.selectedSession = event.target.value;
    }

    handleSubmitClick(event) {
        submitChange({ attendeeId: this.recordId, sessionId: this.selectedSession }).then(
            response => {
                console.info(response);
                alert('Session updated successfully!');

                window.location.reload();
            }).catch(error => {
                console.info(error);
                alert('An error occurred while trying to update the session. Please make sure you selected a new session.')
            });
    }

    handleDeleteClick(event) {
        abortSession({ attendeeId: this.recordId }).then(
            response => {
                console.info(response);
                alert('Session aborted successfully!');

                window.location.reload();
            }).catch(error => {
                console.info(error);
                alert('An error occured while trying to abort the session.')
            });
    }

    get showButton(){
        return !this.checkIfErrors();
    }

    checkIfErrors() {
        var allValid = true;
        // var inputs = this.template.querySelectorAll('.inputField');
        // inputs.forEach( input => {
        //     if (input.value.length <= 0) {
        //         input.reportValidity();
        //         allValid = false;
        //     }
        // })

        var inputs = this.template.querySelectorAll('.pickField');
        inputs.forEach( input => {

            if (input.value == 'null' || input.value == null) {
                input.reportValidity();
                allValid = false;
            }
        })

        return allValid;
    }
}