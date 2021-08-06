import { LightningElement, wire } from 'lwc';

import getContacts from '@salesforce/apex/ContactsGetter.getContacts'
import submitChange from '@salesforce/apex/ContactsGetter.submitChange'
import dispContacts from '@salesforce/apex/ContactsGetter.dispContacts'

export default class ContactsPicklist extends LightningElement {
    selectedContact;
    firstNameChange;
    contactsList;
    displayContacts;
    
    alpha_validation = '[a-zA-Z]*$';

    @wire(dispContacts)
    display({error, data}) {
        if (data) {
            this.displayContacts = data;
        }
    }

    @wire(getContacts)
    contacts({error, data}) {
        let tempArray = [];
        if (data) {
            for (let key in data) {
                tempArray.push({label:data[key], value:key});
            }
        }
        this.contactsList = tempArray;
    }


    handleContactChange(event) {
        this.selectedContact = event.target.value;
    }

    handleFirstNameChange(event) {
        this.firstNameChange = event.target.value;
    }

    handleSubmitClick(event) {
        submitChange({ contactId: this.selectedContact, firstName: this.firstNameChange }).then(
            response=> {
                console.info(response);
                alert('Contact updated successfully!');

                window.location.reload();
            }).catch(error => {
                console.info(error);
                alert('An error occurred while trying to update the contact. Please verify input data.')
            });
    }

    get showButton(){
        return !this.checkIfErrors();
    }

    checkIfErrors() {
        var allValid = true;
        var inputs = this.template.querySelectorAll('.inputField');
        inputs.forEach( input => {
            if (input.value.length <= 0) {
                input.reportValidity();
                allValid = false;
            }
        })

        inputs = this.template.querySelectorAll('.pickField');
        inputs.forEach( input => {

            if (input.value == 'null') {
                input.reportValidity();
                allValid = false;
            }
        })

        return allValid;
    }
}