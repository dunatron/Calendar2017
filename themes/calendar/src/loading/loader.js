export default class HappLoader
{

    constructor(element) {
        this.element = element;
    }

    startLoading () {
        $(this.element).removeClass('ajax-not-loading');
        $(this.element).addClass('ajax-is-loading');
    }

    finishLoading () {
        $(this.element).removeClass('ajax-is-loading');
        $(this.element).addClass('ajax-not-loading');
    }

}