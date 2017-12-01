import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegionFishDemo } from './region-fish-demo.model';
import { RegionFishDemoPopupService } from './region-fish-demo-popup.service';
import { RegionFishDemoService } from './region-fish-demo.service';

@Component({
    selector: 'jhi-region-fish-demo-delete-dialog',
    templateUrl: './region-fish-demo-delete-dialog.component.html'
})
export class RegionFishDemoDeleteDialogComponent {

    region: RegionFishDemo;

    constructor(
        private regionService: RegionFishDemoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regionListModification',
                content: 'Deleted an region'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-region-fish-demo-delete-popup',
    template: ''
})
export class RegionFishDemoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regionPopupService
                .open(RegionFishDemoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
