import { LightningElement } from 'lwc';

export default class EditProfile extends LightningElement {
    cnp;
    city;
    country;
    birthdate;
    displayEditProfile = false;

    overrideValue(event) {

    }

    handleCNP(event) {
        this.cnp = event.detail.value;
        console.log("[CNP]You wrote: " + event.detail.value);
    }

    handleCity(event) {
        this.city = event.detail.value;
        console.log("[CITY]You wrote: " + event.detail.value);
    }

    handleCountry(event) {
        this.country = event.detail.value;
        console.log("[COUNTRY]You wrote: " + event.detail.value);
    }

    handleBirthdate(event) {
        this.birthdate = event.detail.value;
        console.log("[BIRTHDATE]You wrote: " + event.detail.value);
    }
}