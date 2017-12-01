import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LakeFishDemo } from './lake-fish-demo.model';
import { LakeFishDemoPopupService } from './lake-fish-demo-popup.service';
import { LakeFishDemoService } from './lake-fish-demo.service';
import { RegionFishDemo, RegionFishDemoService } from '../region-fish-demo';
import { FishFishDemo, FishFishDemoService } from '../fish-fish-demo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lake-fish-demo-dialog',
    templateUrl: './lake-fish-demo-dialog.component.html'
})
export class LakeFishDemoDialogComponent implements OnInit {

    lake: LakeFishDemo;
    isSaving: boolean;

    regions: RegionFishDemo[];

    fish: FishFishDemo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lakeService: LakeFishDemoService,
        private regionService: RegionFishDemoService,
        private fishService: FishFishDemoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.regionService
            .query({filter: 'lake(name)-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.lake.region || !this.lake.region.id) {
                    this.regions = res.json;
                } else {
                    this.regionService
                        .find(this.lake.region.id)
                        .subscribe((subRes: RegionFishDemo) => {
                            this.regions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.fishService.query()
            .subscribe((res: ResponseWrapper) => { this.fish = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lake.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lakeService.update(this.lake));
        } else {
            this.subscribeToSaveResponse(
                this.lakeService.create(this.lake));
        }
    }

    private subscribeToSaveResponse(result: Observable<LakeFishDemo>) {
        result.subscribe((res: LakeFishDemo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LakeFishDemo) {
        this.eventManager.broadcast({ name: 'lakeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegionById(index: number, item: RegionFishDemo) {
        return item.id;
    }

    trackFishById(index: number, item: FishFishDemo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lake-fish-demo-popup',
    template: ''
})
export class LakeFishDemoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lakePopupService: LakeFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lakePopupService
                    .open(LakeFishDemoDialogComponent as Component, params['id']);
            } else {
                this.lakePopupService
                    .open(LakeFishDemoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
