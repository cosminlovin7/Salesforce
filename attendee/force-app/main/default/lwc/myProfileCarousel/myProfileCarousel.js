import { LightningElement, wire } from 'lwc';

import getUserCertifications from '@salesforce/apex/CertificationGetter.getUserCertifications';
import dispUserCertif from '@salesforce/apex/CertificationGetter.dispUserCertif';

import Id from '@salesforce/user/Id';

export default class MyProfileCarousel extends LightningElement {
    displayCertifications;
    slides;

    @wire(dispUserCertif, {user: Id})
    display({error, data}) {
        if (data) {
            this.displayCertifications = data;
        }
    }

    @wire(getUserCertifications, {user: Id})
    certifications({error, data}) {
        let tempArray = [];
        if (data) {
            data.forEach(record => tempArray.push({object: record}));
        }

        this.slides = tempArray;
    }
}