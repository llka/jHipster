import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FishFishDemo } from './fish-fish-demo.model';
import { FishFishDemoPopupService } from './fish-fish-demo-popup.service';
import { FishFishDemoService } from './fish-fish-demo.service';

@Component({
    selector: 'jhi-fish-fish-demo-dialog',
    templateUrl: './fish-fish-demo-dialog.component.html'
})
export class FishFishDemoDialogComponent implements OnInit {

    fish: FishFishDemo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fishService: FishFishDemoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fish.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fishService.update(this.fish));
        } else {
            this.subscribeToSaveResponse(
                this.fishService.create(this.fish));
        }
    }

    private subscribeToSaveResponse(result: Observable<FishFishDemo>) {
        result.subscribe((res: FishFishDemo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FishFishDemo) {
        this.eventManager.broadcast({ name: 'fishListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-fish-fish-demo-popup',
    template: ''
})
export class FishFishDemoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fishPopupService: FishFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fishPopupService
                    .open(FishFishDemoDialogComponent as Component, params['id']);
            } else {
                this.fishPopupService
                    .open(FishFishDemoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
