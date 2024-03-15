import devAdvancedSwatchImage from './custom/dev-advanced-swatch-image';

export default class PageManager {
    constructor(context) {
        this.context = context;
    }

    type() {
        return this.constructor.name;
    }

    onReady() {
    }

    static load(context) {
        const page = new this(context);

        $(document).ready(() => {
            page.onReady.bind(page)();
        });

        const get_template = page.context.template.replace(/([-.€])+/g, '');
        if (get_template.indexOf('home') > -1){
            devAdvancedSwatchImage(); 
            /* console.log('Load devAdvancedSwatchImage JS only for Homepage'); */
        }
    }
}
