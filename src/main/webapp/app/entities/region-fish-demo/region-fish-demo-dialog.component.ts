import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegionFishDemo } from './region-fish-demo.model';
import { RegionFishDemoPopupService } from './region-fish-demo-popup.service';
import { RegionFishDemoService } from './region-fish-demo.service';
import { LakeFishDemo, LakeFishDemoService } from '../lake-fish-demo';
import { RiverFishDemo, RiverFishDemoService } from '../river-fish-demo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-region-fish-demo-dialog',
    templateUrl: './region-fish-demo-dialog.component.html'
})
export class RegionFishDemoDialogComponent implements OnInit {

    region: RegionFishDemo;
    isSaving: boolean;

    lakes: LakeFishDemo[];

    rivers: RiverFishDemo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private regionService: RegionFishDemoService,
        private lakeService: LakeFishDemoService,
        private riverService: RiverFishDemoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lakeService.query()
            .subscribe((res: ResponseWrapper) => { this.lakes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.riverService.query()
            .subscribe((res: ResponseWrapper) => { this.rivers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(
                this.regionService.create(this.region));
        }
    }

    private subscribeToSaveResponse(result: Observable<RegionFishDemo>) {
        result.subscribe((res: RegionFishDemo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RegionFishDemo) {
        this.eventManager.broadcast({ name: 'regionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLakeById(index: number, item: LakeFishDemo) {
        return item.id;
    }

    trackRiverById(index: number, item: RiverFishDemo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-region-fish-demo-popup',
    template: ''
})
export class RegionFishDemoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regionPopupService
                    .open(RegionFishDemoDialogComponent as Component, params['id']);
            } else {
                this.regionPopupService
                    .open(RegionFishDemoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
