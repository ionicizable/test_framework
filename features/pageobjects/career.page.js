const Page = require('./page');

class CareerPage extends Page {

    get btnSubmit() { return $('button[type="submit"]') }
    get "Header career button"() { return $('.top-navigation__item-link.active[href="/careers"]') }
    get "Learn more"() { return $('.button-ui.bg-color-white.standard[href="https://www.epam.com/careers/epam-without-borders"]') }
    get "Keyword field"() { return $('#new_form_job_search_1445745853_copy-keyword') }
    get "Location field"() { return $('.select2-selection.select2-selection--single') }
    get "Skills field"() { return $('.selected-params') }
    get "Find button"() { return $('.recruiting-search__submit') }
    get "Relocation checkbox"() { return $('[for*="relocation"]') }
    get "Office checkbox"() { return $('[for*="office"]') }
    get "Remote checkbox"() { return $('[for*="remote"]') }
    get "Job items"() { return $$('.search-result__item') }
    get "Job names"() { return $$('.search-result__item-info h5')}

    async checkForIcon(iconName) {
        let containsFaultyJob = false;
        let jobs = this['Job items'];
        await jobs.forEach(async (job) => {
            let icons = await job.$$('.search-result__item-icon');
            for(let i = 0; i<icons.length; i++){
                icons[i]= await icons[i].getAttribute("data-title");
            }
            if(!icons.includes(iconName)){
                containsFaultyJob = true;
            }            
        });
        return !containsFaultyJob;
    }

    async checkForNames(keyword){
        let containsFaultyJob = false;
        let jobs = await this['Job names'];
        if(jobs.length == 0){
            return false;
        }
        await jobs.map(async (job) => job = job.getText());
        console.log(JSON.stringify(jobs));
        await jobs.forEach(async (name) => {
            if(!name.includes(keyword)){
                containsFaultyJob = true;
            }
        });
        return !containsFaultyJob;
    }

    async chooseLocation(city, country) {
        await this.click("Location field");
        if (await $(`//li[@aria-label="${country}"]`).getAttribute("class") === 'select2-results__option') {
            await $(`//strong[text()="${country}"]`).scrollIntoView();
            await $(`//strong[text()="${country}"]`).click();
        }
        await browser.waitUntil(() => $(`//li[text()="${city}"]`).isClickable());
        await $(`//li[text()="${city}"]`).click();
        browser.pause(1000);
    }

    acceptCookies() {
        this.acceptCookiesBtn.click();
    }
}

module.exports = new CareerPage();
