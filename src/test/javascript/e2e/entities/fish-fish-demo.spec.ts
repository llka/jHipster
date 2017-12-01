import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Fish e2e test', () => {

    let navBarPage: NavBarPage;
    let fishDialogPage: FishDialogPage;
    let fishComponentsPage: FishComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Fish', () => {
        navBarPage.goToEntity('fish-fish-demo');
        fishComponentsPage = new FishComponentsPage();
        expect(fishComponentsPage.getTitle()).toMatch(/fishingApp.fish.home.title/);

    });

    it('should load create Fish dialog', () => {
        fishComponentsPage.clickOnCreateButton();
        fishDialogPage = new FishDialogPage();
        expect(fishDialogPage.getModalTitle()).toMatch(/fishingApp.fish.home.createOrEditLabel/);
        fishDialogPage.close();
    });

    it('should create and save Fish', () => {
        fishComponentsPage.clickOnCreateButton();
        fishDialogPage.setNameInput('name');
        expect(fishDialogPage.getNameInput()).toMatch('name');
        fishDialogPage.setDescriptionInput('description');
        expect(fishDialogPage.getDescriptionInput()).toMatch('description');
        fishDialogPage.eatingTypeSelectLastOption();
        fishDialogPage.setAvgWeightInput('5');
        expect(fishDialogPage.getAvgWeightInput()).toMatch('5');
        fishDialogPage.setMaxWeightInput('5');
        expect(fishDialogPage.getMaxWeightInput()).toMatch('5');
        fishDialogPage.setAvgLengthInput('5');
        expect(fishDialogPage.getAvgLengthInput()).toMatch('5');
        fishDialogPage.setMaxLengthInput('5');
        expect(fishDialogPage.getMaxLengthInput()).toMatch('5');
        fishDialogPage.setMaxAgeInput('5');
        expect(fishDialogPage.getMaxAgeInput()).toMatch('5');
        fishDialogPage.summerDepthSelectLastOption();
        fishDialogPage.save();
        expect(fishDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FishComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-fish-fish-demo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FishDialogPage {
    modalTitle = element(by.css('h4#myFishLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    eatingTypeSelect = element(by.css('select#field_eatingType'));
    avgWeightInput = element(by.css('input#field_avgWeight'));
    maxWeightInput = element(by.css('input#field_maxWeight'));
    avgLengthInput = element(by.css('input#field_avgLength'));
    maxLengthInput = element(by.css('input#field_maxLength'));
    maxAgeInput = element(by.css('input#field_maxAge'));
    summerDepthSelect = element(by.css('select#field_summerDepth'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setEatingTypeSelect = function (eatingType) {
        this.eatingTypeSelect.sendKeys(eatingType);
    }

    getEatingTypeSelect = function () {
        return this.eatingTypeSelect.element(by.css('option:checked')).getText();
    }

    eatingTypeSelectLastOption = function () {
        this.eatingTypeSelect.all(by.tagName('option')).last().click();
    }
    setAvgWeightInput = function (avgWeight) {
        this.avgWeightInput.sendKeys(avgWeight);
    }

    getAvgWeightInput = function () {
        return this.avgWeightInput.getAttribute('value');
    }

    setMaxWeightInput = function (maxWeight) {
        this.maxWeightInput.sendKeys(maxWeight);
    }

    getMaxWeightInput = function () {
        return this.maxWeightInput.getAttribute('value');
    }

    setAvgLengthInput = function (avgLength) {
        this.avgLengthInput.sendKeys(avgLength);
    }

    getAvgLengthInput = function () {
        return this.avgLengthInput.getAttribute('value');
    }

    setMaxLengthInput = function (maxLength) {
        this.maxLengthInput.sendKeys(maxLength);
    }

    getMaxLengthInput = function () {
        return this.maxLengthInput.getAttribute('value');
    }

    setMaxAgeInput = function (maxAge) {
        this.maxAgeInput.sendKeys(maxAge);
    }

    getMaxAgeInput = function () {
        return this.maxAgeInput.getAttribute('value');
    }

    setSummerDepthSelect = function (summerDepth) {
        this.summerDepthSelect.sendKeys(summerDepth);
    }

    getSummerDepthSelect = function () {
        return this.summerDepthSelect.element(by.css('option:checked')).getText();
    }

    summerDepthSelectLastOption = function () {
        this.summerDepthSelect.all(by.tagName('option')).last().click();
    }
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
