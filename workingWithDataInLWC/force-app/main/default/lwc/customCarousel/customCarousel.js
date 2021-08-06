import { LightningElement, api } from 'lwc';

const CARD_SHOW_CLASSES = 'fade slds-show'
const CARD_HIDE_CLASSES = 'fade slds-hide'

const ACTIVE_DOT = 'dot active'
const DIS_DOT = 'dot'

const DEFAULT_WIDTH = 500;
const FULL_WIDTH = 1000;
export default class CustomCarousel extends LightningElement {
    slides = [];
    slideIndex = 1;
    timer
    @api slideTimer = 3000;
    @api enableAutoScroll = false;
    @api customWidth = DEFAULT_WIDTH;
    @api fullWidth = FULL_WIDTH;
    @api showFull = false;

    get maxWidth() {
        return this.showFull ? `width:${Number(this.fullWidth)}px` : `width:${Number(this.customWidth)}px`;
    }

    @api get slidesData() {
        return this.slides;
    }

    set slidesData(data) {
        this.slides = data.map((item, index) => {
            return index === 0 ? {
                ...item, 
                slideIndex: index + 1,
                cardClasses: CARD_SHOW_CLASSES,
                dotClasses: ACTIVE_DOT
            }:{
                ...item, 
                slideIndex: index + 1,
                cardClasses: CARD_HIDE_CLASSES,
                dotClasses: DIS_DOT
            }
        })
    }

    connectedCallback() {
        if (this.enableAutoScroll) {
            this.timer = window.setInterval(() => {
                this.slideSelectionHandler(this.slideIndex + 1);
            }, Number(this.slideTimer))
        }
    }

    disconnectedCallback() {
        if (this.enableAutoScroll) {
            window.clearInterval(this.timer);
        }
    }

    currentSlide(event) {
        let slideIndex = Number(event.target.dataset.id);
        this.slideSelectionHandler(slideIndex);
    }

    previousSlide() {
        let slideIndex = this.slideIndex - 1;
        this.slideSelectionHandler(slideIndex);
    }

    nextSlide() {
        let slideIndex = this.slideIndex + 1;
        this.slideSelectionHandler(slideIndex);
    }

    slideSelectionHandler(id) {
        if (id > this.slides.length) {
            this.slideIndex = 1;
        } else if (id < 1) {
            this.slideIndex = this.slides.length;
        } else {
            this.slideIndex = id;
        }

        this.slides = this.slides.map((item) => {
            return this.slideIndex === item.slideIndex ? {
                ...item, 
                cardClasses: CARD_SHOW_CLASSES,
                dotClasses: ACTIVE_DOT
            }:{
                ...item, 
                cardClasses: CARD_HIDE_CLASSES,
                dotClasses: DIS_DOT
            }
        })
    }
}