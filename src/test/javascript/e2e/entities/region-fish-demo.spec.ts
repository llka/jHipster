import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Region e2e test', () => {

    let navBarPage: NavBarPage;
    let regionDialogPage: RegionDialogPage;
    let regionComponentsPage: RegionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Regions', () => {
        navBarPage.goToEntity('region-fish-demo');
        regionComponentsPage = new RegionComponentsPage();
        expect(regionComponentsPage.getTitle()).toMatch(/fishingApp.region.home.title/);

    });

    it('should load create Region dialog', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage = new RegionDialogPage();
        expect(regionDialogPage.getModalTitle()).toMatch(/fishingApp.region.home.createOrEditLabel/);
        regionDialogPage.close();
    });

    it('should create and save Regions', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage.setNameInput('name');
        expect(regionDialogPage.getNameInput()).toMatch('name');
        regionDialogPage.setPostalCodeInput('postalCode');
        expect(regionDialogPage.getPostalCodeInput()).toMatch('postalCode');
        regionDialogPage.setMainCityInput('mainCity');
        expect(regionDialogPage.getMainCityInput()).toMatch('mainCity');
        regionDialogPage.riverSelectLastOption();
        regionDialogPage.save();
        expect(regionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RegionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-region-fish-demo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RegionDialogPage {
    modalTitle = element(by.css('h4#myRegionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    mainCityInput = element(by.css('input#field_mainCity'));
    riverSelect = element(by.css('select#field_river'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setPostalCodeInput = function (postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    }

    getPostalCodeInput = function () {
        return this.postalCodeInput.getAttribute('value');
    }

    setMainCityInput = function (mainCity) {
        this.mainCityInput.sendKeys(mainCity);
    }

    getMainCityInput = function () {
        return this.mainCityInput.getAttribute('value');
    }

    riverSelectLastOption = function () {
        this.riverSelect.all(by.tagName('option')).last().click();
    }

    riverSelectOption = function (option) {
        this.riverSelect.sendKeys(option);
    }

    getRiverSelect = function () {
        return this.riverSelect;
    }

    getRiverSelectedOption = function () {
        return this.riverSelect.element(by.css('option:checked')).getText();
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
