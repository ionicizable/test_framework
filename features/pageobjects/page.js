module.exports = class Page {

    get acceptCookiesBtn () { return $('.button-ui.bg-color-light-blue.cookie-disclaimer__button')}
    open (url) {
        return browser.url(url);
    }

    async click (elementName) {
        const element = await this[`${elementName}`];
        await element.scrollIntoView();
        await element.click();
    }

    async input(text, elementName) {
        const element = await this[`${elementName}`];
        await browser.waitUntil(() => element.isClickable());
        await element.scrollIntoView();
        await element.setValue(text);
    }
}
