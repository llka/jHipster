import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('River e2e test', () => {

    let navBarPage: NavBarPage;
    let riverDialogPage: RiverDialogPage;
    let riverComponentsPage: RiverComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rivers', () => {
        navBarPage.goToEntity('river-fish-demo');
        riverComponentsPage = new RiverComponentsPage();
        expect(riverComponentsPage.getTitle()).toMatch(/fishingApp.river.home.title/);

    });

    it('should load create River dialog', () => {
        riverComponentsPage.clickOnCreateButton();
        riverDialogPage = new RiverDialogPage();
        expect(riverDialogPage.getModalTitle()).toMatch(/fishingApp.river.home.createOrEditLabel/);
        riverDialogPage.close();
    });

    it('should create and save Rivers', () => {
        riverComponentsPage.clickOnCreateButton();
        riverDialogPage.setNameInput('name');
        expect(riverDialogPage.getNameInput()).toMatch('name');
        riverDialogPage.setAverageSpeedInput('5');
        expect(riverDialogPage.getAverageSpeedInput()).toMatch('5');
        riverDialogPage.setLengthInKmInput('5');
        expect(riverDialogPage.getLengthInKmInput()).toMatch('5');
        riverDialogPage.fishRiverSelectLastOption();
        riverDialogPage.save();
        expect(riverDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RiverComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-river-fish-demo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RiverDialogPage {
    modalTitle = element(by.css('h4#myRiverLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    averageSpeedInput = element(by.css('input#field_averageSpeed'));
    lengthInKmInput = element(by.css('input#field_lengthInKm'));
    fishRiverSelect = element(by.css('select#field_fishRiver'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setAverageSpeedInput = function (averageSpeed) {
        this.averageSpeedInput.sendKeys(averageSpeed);
    }

    getAverageSpeedInput = function () {
        return this.averageSpeedInput.getAttribute('value');
    }

    setLengthInKmInput = function (lengthInKm) {
        this.lengthInKmInput.sendKeys(lengthInKm);
    }

    getLengthInKmInput = function () {
        return this.lengthInKmInput.getAttribute('value');
    }

    fishRiverSelectLastOption = function () {
        this.fishRiverSelect.all(by.tagName('option')).last().click();
    }

    fishRiverSelectOption = function (option) {
        this.fishRiverSelect.sendKeys(option);
    }

    getFishRiverSelect = function () {
        return this.fishRiverSelect;
    }

    getFishRiverSelectedOption = function () {
        return this.fishRiverSelect.element(by.css('option:checked')).getText();
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
