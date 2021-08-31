import { LightningElement, wire } from 'lwc';

import getUserBadgesNr from '@salesforce/apex/CertificationGetter.getUserBadgesNr';
import getAboutMe from '@salesforce/apex/AttendeeController.getAboutMe';
import getProfileName from '@salesforce/apex/AttendeeController.getProfileName';
import getInfo from '@salesforce/apex/AttendeeController.getInfo';
import getUserPic from '@salesforce/apex/AttendeeController.getUserPic';

import submitChange from '@salesforce/apex/AttendeeController.submitChange';

import Id from '@salesforce/user/Id';

export default class MyProfile extends LightningElement {
    slides;
    displayCertifications;
    displayEditProfile = false;

    attendeeId;
    name;
    age;
    email;
    cnp;
    birthdate;
    city;
    country;
    about;
    profilePic;
    profileName;
    numberOfBadges;

    edit_cnp;
    edit_city;
    edit_country;
    edit_birthdate;

    @wire(getUserPic, {user: Id})
    userProfile({error, data}) {
        if (data) {
            this.profilePic = data;
        }
    }

    @wire(getInfo, {user: Id})
    attendeeInfo({error, data}) {
        if (data) {
            this.attendeeId = data.Id;
            this.name = data.Name;
            this.email = data.Email__c;
            this.cnp = data.CNP__c;
            this.birthdate = data.Birthdate__c;
            this.city = data.City__c;
            this.country = data.Country__c;

            const currentYear = new Date().getFullYear();
            const birthYear = this.birthdate.split('-')[0];

            this.age = currentYear - birthYear;
        }
    }

    @wire(getProfileName, {user: Id})
    profileInfo({error, data}) {
        if (data) {
            this.profileName = data;
        }
    }

    @wire(getAboutMe, {user: Id})
    aboutMeInfo({error, data}) {
        if (data) {
            this.about = data;
        }
    }

    @wire(getUserBadgesNr, {user: Id})
    userBadges({error, data}) {
        if (data) {
            this.numberOfBadges = data;
        }
    }

    handleEditProfile(event) {
        this.displayEditProfile = true;
    }

    handleSaveButton(event) {
        submitChange({ user: Id, cnp: this.edit_cnp, 
                       city: this.edit_city, country: this.edit_country, 
                       birthdate: this.edit_birthdate }).then(
            response => {
                console.info(response);
                alert('Information updated successfully!');

                window.location.reload();
            }).catch(error => {
                console.info(error);
                alert('An error occurred while trying to update the information.')
            });
    }

    handleCloseButton(event) {
        this.displayEditProfile = false;
    }

    handleCNP(event) {
        this.edit_cnp = event.detail.value;
        console.log("[CNP]You wrote: " + event.detail.value);
    }

    handleCity(event) {
        this.edit_city = event.detail.value;
        console.log("[CITY]You wrote: " + event.detail.value);
    }

    handleCountry(event) {
        this.edit_country = event.detail.value;
        console.log("[COUNTRY]You wrote: " + event.detail.value);
    }

    handleBirthdate(event) {
        this.edit_birthdate = event.detail.value;
        console.log("[BIRTHDATE]You wrote: " + event.detail.value);
    }
}