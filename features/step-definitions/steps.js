const { Given, When, Then } = require('@wdio/cucumber-framework');

const CareerPage = require('../pageobjects/career.page');
const expect = require('expect');
let currentPage;

Given(/^I open '(.*)'$/, async (page) => {
    await browser.maximizeWindow();
    await CareerPage.open(page);
    currentPage = CareerPage;
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await CareerPage.login(username, password)
});

When(/^I accept cookies/, async () => {
    await CareerPage.acceptCookies();
});

When(/^I type "(.*)" in "(.*)"/, async (text, elementName) => {
    await currentPage.input(text, elementName);
});

When(/^I choose "(.*)" city in "(.*)" country/, async (city, country) => {
    await currentPage.chooseLocation(city, country);
});

When(/^I click "(.*)"/, async (elementName) => {
    await currentPage.click(elementName);
});

When(/^I submit filters$/, async () => {
    await CareerPage.click("Find button");
});

When(/^I check "(.*)" box$/, async (checkbox) => {
    await CareerPage.click(checkbox);
});

Then(/^"(.*)" should be visible$/, async (elementName) => {
    currentPage[`${elementName}`].isVisible();
});

Then(/^applications should have "(.*)" icon$/, async (iconName) => {
    switch (iconName) {
        case "Relocation checkbox": expect(await CareerPage.checkForIcon("Open to Relocation")).toEqual(true);
        case "Office checkbox": expect(await CareerPage.checkForIcon("Work from office")).toEqual(true);
        case "Remote checkbox": expect(await CareerPage.checkForIcon("You can work from home or anywhere in the world if you apply for remote positions.")).toEqual(true);
    }

});

Then(/^locations should contain "(.*)" city or "(.*)" country$/, async (city, country) => {
    let result = true;
    await $$('.search-result__location').some(async (searchResultLocation) => {
        searchResultLocation.getText().then((location)=>{
            if (typeof location === "string") {
                if (
                    location.includes(country.toUpperCase()) ||
                    location.includes(city.toUpperCase())
                ) {
                    result = true;
                } else result = false;
            } else result = false;
        })
        
    });
    expect(result).toEqual(true);
});


Then(/^job names should contain "(.*)"$/, async (keyword) => {
    expect(await CareerPage.checkForNames(keyword)).toEqual(true);
});

Then(/^url should be "(.*)"$/, async (url) => {
    expect(browser).toHaveUrl(url);
});

