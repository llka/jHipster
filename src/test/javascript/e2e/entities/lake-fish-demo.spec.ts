import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Lake e2e test', () => {

    let navBarPage: NavBarPage;
    let lakeDialogPage: LakeDialogPage;
    let lakeComponentsPage: LakeComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lakes', () => {
        navBarPage.goToEntity('lake-fish-demo');
        lakeComponentsPage = new LakeComponentsPage();
        expect(lakeComponentsPage.getTitle()).toMatch(/fishingApp.lake.home.title/);

    });

    it('should load create Lake dialog', () => {
        lakeComponentsPage.clickOnCreateButton();
        lakeDialogPage = new LakeDialogPage();
        expect(lakeDialogPage.getModalTitle()).toMatch(/fishingApp.lake.home.createOrEditLabel/);
        lakeDialogPage.close();
    });

    it('should create and save Lakes', () => {
        lakeComponentsPage.clickOnCreateButton();
        lakeDialogPage.setNameInput('name');
        expect(lakeDialogPage.getNameInput()).toMatch('name');
        lakeDialogPage.setAverageDepthInput('5');
        expect(lakeDialogPage.getAverageDepthInput()).toMatch('5');
        lakeDialogPage.setMaxDepthInput('5');
        expect(lakeDialogPage.getMaxDepthInput()).toMatch('5');
        lakeDialogPage.regionSelectLastOption();
        lakeDialogPage.fishLakeSelectLastOption();
        lakeDialogPage.save();
        expect(lakeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LakeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lake-fish-demo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LakeDialogPage {
    modalTitle = element(by.css('h4#myLakeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    averageDepthInput = element(by.css('input#field_averageDepth'));
    maxDepthInput = element(by.css('input#field_maxDepth'));
    regionSelect = element(by.css('select#field_region'));
    fishLakeSelect = element(by.css('select#field_fishLake'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setAverageDepthInput = function (averageDepth) {
        this.averageDepthInput.sendKeys(averageDepth);
    }

    getAverageDepthInput = function () {
        return this.averageDepthInput.getAttribute('value');
    }

    setMaxDepthInput = function (maxDepth) {
        this.maxDepthInput.sendKeys(maxDepth);
    }

    getMaxDepthInput = function () {
        return this.maxDepthInput.getAttribute('value');
    }

    regionSelectLastOption = function () {
        this.regionSelect.all(by.tagName('option')).last().click();
    }

    regionSelectOption = function (option) {
        this.regionSelect.sendKeys(option);
    }

    getRegionSelect = function () {
        return this.regionSelect;
    }

    getRegionSelectedOption = function () {
        return this.regionSelect.element(by.css('option:checked')).getText();
    }

    fishLakeSelectLastOption = function () {
        this.fishLakeSelect.all(by.tagName('option')).last().click();
    }

    fishLakeSelectOption = function (option) {
        this.fishLakeSelect.sendKeys(option);
    }

    getFishLakeSelect = function () {
        return this.fishLakeSelect;
    }

    getFishLakeSelectedOption = function () {
        return this.fishLakeSelect.element(by.css('option:checked')).getText();
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
