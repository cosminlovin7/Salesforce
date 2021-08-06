import { LightningElement } from 'lwc';
import CAROUSEL_ITEMS from '@salesforce/resourceUrl/carousel';

export default class CustomCarouselWrapper extends LightningElement {

    slides = [{
        image:`${CAROUSEL_ITEMS}/1.jpg`,
        heading:'Caption one',
        description:'Description one'
    },
    {
        image:`${CAROUSEL_ITEMS}/2.jpg`,
        heading:'Caption two',
        description:'Description two'
    },
    {
        image:`${CAROUSEL_ITEMS}/3.jpg`,
        heading:'Caption three',
        description:'Description three'
    }]

    connectedCallback() {
        console.info('cate sunt2', this.slides.length);
    }
}