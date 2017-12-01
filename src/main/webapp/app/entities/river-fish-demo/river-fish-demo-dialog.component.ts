import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RiverFishDemo } from './river-fish-demo.model';
import { RiverFishDemoPopupService } from './river-fish-demo-popup.service';
import { RiverFishDemoService } from './river-fish-demo.service';
import { FishFishDemo, FishFishDemoService } from '../fish-fish-demo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-river-fish-demo-dialog',
    templateUrl: './river-fish-demo-dialog.component.html'
})
export class RiverFishDemoDialogComponent implements OnInit {

    river: RiverFishDemo;
    isSaving: boolean;

    fish: FishFishDemo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private riverService: RiverFishDemoService,
        private fishService: FishFishDemoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fishService.query()
            .subscribe((res: ResponseWrapper) => { this.fish = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.river.id !== undefined) {
            this.subscribeToSaveResponse(
                this.riverService.update(this.river));
        } else {
            this.subscribeToSaveResponse(
                this.riverService.create(this.river));
        }
    }

    private subscribeToSaveResponse(result: Observable<RiverFishDemo>) {
        result.subscribe((res: RiverFishDemo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RiverFishDemo) {
        this.eventManager.broadcast({ name: 'riverListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFishById(index: number, item: FishFishDemo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-river-fish-demo-popup',
    template: ''
})
export class RiverFishDemoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private riverPopupService: RiverFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.riverPopupService
                    .open(RiverFishDemoDialogComponent as Component, params['id']);
            } else {
                this.riverPopupService
                    .open(RiverFishDemoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
