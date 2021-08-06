import { LightningElement, api, wire } from 'lwc';

import getCList from '@salesforce/apex/ContactsGetter.getCList';

export default class ContactCarousel extends LightningElement {
    slides;

    @wire(getCList)
    contacts({error, data}) {
        let tempArray = [];
        if (data) {
            data.forEach(record => tempArray.push({object: record}));
        }
        this.slides = tempArray;
    }

    connectedCallback() {
        console.info(this.slides.length);
    }
}